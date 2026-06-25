#!/usr/bin/env python3
"""Small HTTP CLI for sidecar %hawk499 lesson endpoints.

This tool intentionally talks to %hawk499 through the same authenticated `/i`
editor route a browser uses. It does not copy files into the hawk499 desk and
does not require any Urbit pier filesystem access.

Common examples:

  python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py login \
    --ship-url http://localhost:8080 \
    --code "$HAWK499_CODE" \
    --cookie-jar /tmp/hawk499.cookies

  python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py install-all \
    --ship-url http://localhost:8080 \
    --cookie-jar /tmp/hawk499.cookies

  python skills/using-urbit-apps/references/hawk499/scripts/hawk499_http.py cleanup-legacy \
    --ship-url http://localhost:8080 \
    --cookie-jar /tmp/hawk499.cookies
"""

from __future__ import annotations

import argparse
import html
import http.cookiejar
import json
import os
from pathlib import Path
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request


SCRIPT_DIR = Path(__file__).resolve().parent
SKILL_DIR = SCRIPT_DIR.parent
DEFAULT_LESSONS_DIR = SKILL_DIR / "lessons"
DEFAULT_COOKIE_JAR = Path("/tmp/hawk499.cookies")


# The current %hawk499 sidebar renders child nodes with Hoon map iteration, not
# lexical sorting. These route labels force the visible `/learn` sidebar into
# lesson order. The trailing letter is only an ordering shim.
ORDERED_ROUTE_NAMES: dict[str, str] = {
    "01-udon-static": "01-udon-static-r",
    "02-sail-static": "02-sail-static-s",
    "03-query-params": "03-query-params-f",
    "04-rest-routing": "04-rest-routing-i",
    "05-json-api": "05-json-api-o",
    "06-form-post": "06-form-post-j",
    "07-feather-static": "07-feather-static-r",
    "08-session-counter": "08-session-counter-f",
    "09-datastar-clicker": "09-datastar-clicker-p",
    "10-todo-simple": "10-todo-simple-j",
    "11-todo-live-feather-1": "11-todo-live-feather-1-x",
    "12-public-vs-owner-only": "12-public-vs-owner-only-r",
    "13-imports": "13-imports-z",
    "14-watch-and-patch": "14-watch-and-patch-r",
    "15-debugging-crashes": "15-debugging-crashes-z",
}


def normalize_ship_url(url: str) -> str:
    return url.rstrip("/")


def normalize_path(path: str) -> str:
    if not path:
        raise ValueError("path must not be empty")
    if not path.startswith("/"):
        path = "/" + path
    if path == "/":
        raise ValueError("refusing to operate on root endpoint path")
    return path.rstrip("/")


def normalize_namespace(namespace: str) -> str:
    namespace = normalize_path(namespace)
    if namespace == "/":
        raise ValueError("namespace must not be root")
    return namespace


def route_name(stem: str, literal_names: bool = False) -> str:
    if literal_names:
        return stem
    return ORDERED_ROUTE_NAMES.get(stem, stem)


def known_lesson_sources(lessons_dir: Path) -> list[Path]:
    lessons = sorted(lessons_dir.glob("*.txt"))
    if not lessons:
        raise FileNotFoundError(f"no lesson files found in {lessons_dir}")
    return lessons


def ordered_lesson_paths(
    lessons_dir: Path,
    namespace: str,
    literal_names: bool = False,
) -> list[tuple[Path, str]]:
    namespace = normalize_namespace(namespace)
    pairs: list[tuple[Path, str]] = []
    for lesson in known_lesson_sources(lessons_dir):
        label = route_name(lesson.stem, literal_names=literal_names)
        pairs.append((lesson, f"{namespace}/{label}"))
    return pairs


def load_cookie_jar(path: Path) -> http.cookiejar.MozillaCookieJar:
    jar = http.cookiejar.MozillaCookieJar(str(path))
    if path.exists():
        jar.load(ignore_discard=True, ignore_expires=True)
    return jar


def save_cookie_jar(jar: http.cookiejar.MozillaCookieJar, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    jar.filename = str(path)
    jar.save(ignore_discard=True, ignore_expires=True)


def opener_for(cookie_jar: Path | None) -> urllib.request.OpenerDirector:
    if cookie_jar is None:
        return urllib.request.build_opener()
    jar = load_cookie_jar(cookie_jar)
    return urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))


def cookie_header_from_jar(path: Path | None) -> str | None:
    """Read a curl/Netscape cookie jar and build a Cookie header.

    Python's cookiejar handling is strict about some localhost jar details. Curl
    is the common tool in the %hawk499 workflow, so authenticated requests set a
    simple Cookie header from the jar contents. The cookie value is never logged.
    """

    if path is None or not path.exists():
        return None

    pairs: list[str] = []
    now = int(time.time())
    for raw in path.read_text(errors="replace").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") and not line.startswith("#HttpOnly_"):
            continue
        if line.startswith("#HttpOnly_"):
            line = line[len("#HttpOnly_") :]
        fields = line.split("\t")
        if len(fields) < 7:
            continue
        _domain, _include_subdomains, _path, _secure, expires, name, value = fields[:7]
        try:
            if expires != "0" and int(expires) < now:
                continue
        except ValueError:
            pass
        if name and value:
            pairs.append(f"{name}={value}")
    if not pairs:
        return None
    return "; ".join(pairs)


def request(
    method: str,
    url: str,
    fields: dict[str, str] | None = None,
    cookie_jar: Path | None = None,
) -> tuple[int, bytes, urllib.response.addinfourl | urllib.error.HTTPError]:
    data = None
    headers = {}
    if fields is not None:
        data = urllib.parse.urlencode(fields).encode("utf-8")
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    cookie_header = cookie_header_from_jar(cookie_jar)
    if cookie_header:
        headers["Cookie"] = cookie_header
    opener = opener_for(cookie_jar)
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with opener.open(req) as resp:
            body = resp.read()
            return resp.status, body, resp
    except urllib.error.HTTPError as err:
        return err.code, err.read(), err


def assert_success(status: int, body: bytes, context: str) -> None:
    if status >= 400:
        text = body.decode("utf-8", errors="replace")
        raise RuntimeError(f"{context} failed with HTTP {status}\n{text}")


def login(ship_url: str, code: str, cookie_jar: Path) -> None:
    ship_url = normalize_ship_url(ship_url)
    jar = http.cookiejar.MozillaCookieJar(str(cookie_jar))
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
    data = urllib.parse.urlencode({"password": code}).encode("utf-8")
    req = urllib.request.Request(
        f"{ship_url}/~/login",
        data=data,
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        method="POST",
    )
    try:
        with opener.open(req) as resp:
            resp.read()
            status = resp.status
    except urllib.error.HTTPError as err:
        body = err.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"login failed with HTTP {err.code}\n{body}") from err
    if status >= 400:
        raise RuntimeError(f"login failed with HTTP {status}")
    save_cookie_jar(jar, cookie_jar)


def put_endpoint(ship_url: str, cookie_jar: Path, path: str, source: str) -> None:
    ship_url = normalize_ship_url(ship_url)
    path = normalize_path(path)
    url = f"{ship_url}/i/o{path}"
    status, body, _ = request(
        "POST",
        url,
        {"op": "put", "source": source},
        cookie_jar=cookie_jar,
    )
    assert_success(status, body, f"put {path}")


def delete_endpoint(ship_url: str, cookie_jar: Path, path: str) -> None:
    ship_url = normalize_ship_url(ship_url)
    path = normalize_path(path)
    url = f"{ship_url}/i/o{path}"
    status, body, _ = request(
        "POST",
        url,
        {"op": "del"},
        cookie_jar=cookie_jar,
    )
    assert_success(status, body, f"delete {path}")


def get_path(ship_url: str, cookie_jar: Path | None, path: str) -> tuple[int, bytes]:
    ship_url = normalize_ship_url(ship_url)
    path = normalize_path(path)
    status, body, _ = request("GET", f"{ship_url}/o{path}", cookie_jar=cookie_jar)
    return status, body


def get_editor(ship_url: str, cookie_jar: Path | None, path: str = "/") -> tuple[int, bytes]:
    ship_url = normalize_ship_url(ship_url)
    if path == "/":
        url = f"{ship_url}/i"
    else:
        path = normalize_path(path)
        url = f"{ship_url}/i/o{path}"
    status, body, _ = request("GET", url, cookie_jar=cookie_jar)
    return status, body


def assert_authenticated_editor(status: int, body: bytes) -> None:
    assert_success(status, body, "editor request")
    text = body.decode("utf-8", errors="replace")
    if "not authenticated" in text and "this editor is private to its owner" in text:
        raise RuntimeError("authenticated editor access failed: /i returned the not-authenticated page")


def list_endpoints(
    ship_url: str,
    cookie_jar: Path,
    prefix: str | None = None,
    all_nodes: bool = False,
) -> list[str]:
    status, body = get_editor(ship_url, cookie_jar, "/")
    assert_authenticated_editor(status, body)
    text = body.decode("utf-8", errors="replace")
    found: list[str] = []
    for match in re.finditer(r'href="/i/o([^"]*)"', text):
        raw = html.unescape(match.group(1))
        if raw in ("", "/"):
            continue
        path = normalize_path(raw)
        if prefix and not path.startswith(normalize_path(prefix)):
            continue
        if not all_nodes and f'aria-label="actions for /o{path}"' not in text:
            continue
        if path not in found:
            found.append(path)
    return found


def move_endpoint(ship_url: str, cookie_jar: Path, old_path: str, new_path: str) -> None:
    ship_url = normalize_ship_url(ship_url)
    old_path = normalize_path(old_path)
    new_path = normalize_path(new_path)
    status, body, _ = request(
        "POST",
        f"{ship_url}/i",
        {"op": "mov", "from": old_path, "path": new_path},
        cookie_jar=cookie_jar,
    )
    assert_success(status, body, f"move {old_path} -> {new_path}")


def package_entries(manifest: Path) -> list[tuple[Path, str]]:
    data = json.loads(manifest.read_text())
    base = manifest.parent
    namespace = data.get("namespace", "")
    entries = data.get("endpoints")
    if not isinstance(entries, list):
        raise ValueError("manifest must contain an endpoints list")
    pairs: list[tuple[Path, str]] = []
    for entry in entries:
        if not isinstance(entry, dict):
            raise ValueError("each endpoint entry must be an object")
        raw_path = entry.get("path")
        raw_source = entry.get("source")
        if not isinstance(raw_path, str) or not isinstance(raw_source, str):
            raise ValueError("each endpoint entry needs string path and source")
        path = normalize_path(f"{namespace.rstrip('/')}/{raw_path.lstrip('/')}") if namespace else normalize_path(raw_path)
        source = Path(raw_source)
        if not source.is_absolute():
            source = base / source
        pairs.append((source, path))
    return pairs


def install_lesson(ship_url: str, cookie_jar: Path, lesson: Path, path: str) -> None:
    source = lesson.read_text()
    put_endpoint(ship_url, cookie_jar, path, source)


def legacy_paths(lessons_dir: Path, namespace: str) -> list[str]:
    namespace = normalize_namespace(namespace)
    paths: list[str] = []
    for lesson in known_lesson_sources(lessons_dir):
        stem = lesson.stem
        paths.append(f"{namespace}/{stem}")
        if "-" in stem:
            num, slug = stem.split("-", 1)
            paths.append(f"{namespace}-seq/{num}/{slug}")
    paths.append(f"{namespace}-order-probe")
    return paths


def cmd_login(args: argparse.Namespace) -> int:
    code = args.code or os.environ.get("HAWK499_CODE")
    if not code:
        raise RuntimeError("provide --code or set HAWK499_CODE")
    login(args.ship_url, code, args.cookie_jar)
    print(f"wrote cookie jar: {args.cookie_jar}")
    return 0


def cmd_status(args: argparse.Namespace) -> int:
    status, body = get_editor(args.ship_url, args.cookie_jar, "/")
    if status >= 400:
        print(f"editor HTTP status: {status}")
        return 1
    text = body.decode("utf-8", errors="replace")
    if "not authenticated" in text and "this editor is private to its owner" in text:
        print("authenticated: no")
        return 1
    print("authenticated: yes")
    return 0


def cmd_install(args: argparse.Namespace) -> int:
    lesson = args.lesson
    path = normalize_path(args.path)
    install_lesson(args.ship_url, args.cookie_jar, lesson, path)
    print(f"installed {lesson} -> {normalize_ship_url(args.ship_url)}/o{path}")
    return 0


def cmd_put(args: argparse.Namespace) -> int:
    path = normalize_path(args.path)
    source = args.source.read_text()
    put_endpoint(args.ship_url, args.cookie_jar, path, source)
    print(f"put {args.source} -> {normalize_ship_url(args.ship_url)}/o{path}")
    return 0


def cmd_get(args: argparse.Namespace) -> int:
    path = normalize_path(args.path)
    status, body = get_path(args.ship_url, args.cookie_jar if args.auth else None, path)
    if args.output:
        args.output.write_bytes(body)
    else:
        sys.stdout.buffer.write(body)
    if status >= 400 and not args.allow_error:
        return 1
    return 0


def cmd_check(args: argparse.Namespace) -> int:
    path = normalize_path(args.path)
    status, body = get_path(args.ship_url, args.cookie_jar, path)
    print(f"{status} {normalize_ship_url(args.ship_url)}/o{path}")
    if status != args.expect_status:
        print(body.decode("utf-8", errors="replace")[:2000], file=sys.stderr)
        return 1
    return 0


def cmd_list(args: argparse.Namespace) -> int:
    paths = list_endpoints(args.ship_url, args.cookie_jar, args.prefix, args.all_nodes)
    if args.json:
        print(json.dumps(paths, indent=2))
    else:
        for path in paths:
            print(path)
    return 0


def cmd_move(args: argparse.Namespace) -> int:
    old_path = normalize_path(args.old_path)
    new_path = normalize_path(args.new_path)
    move_endpoint(args.ship_url, args.cookie_jar, old_path, new_path)
    print(f"moved {old_path} -> {new_path}")
    return 0


def cmd_install_all(args: argparse.Namespace) -> int:
    pairs = ordered_lesson_paths(args.lessons_dir, args.namespace, args.literal_names)
    for lesson, path in pairs:
        install_lesson(args.ship_url, args.cookie_jar, lesson, path)
        print(f"installed {lesson.name} -> {normalize_ship_url(args.ship_url)}/o{path}")
    return 0


def cmd_delete(args: argparse.Namespace) -> int:
    path = normalize_path(args.path)
    delete_endpoint(args.ship_url, args.cookie_jar, path)
    print(f"deleted {path}")
    return 0


def cmd_install_package(args: argparse.Namespace) -> int:
    for source, path in package_entries(args.manifest):
        install_lesson(args.ship_url, args.cookie_jar, source, path)
        print(f"installed {source} -> {normalize_ship_url(args.ship_url)}/o{path}")
    return 0


def cmd_uninstall_package(args: argparse.Namespace) -> int:
    for _, path in package_entries(args.manifest):
        delete_endpoint(args.ship_url, args.cookie_jar, path)
        print(f"deleted {path}")
    return 0


def cmd_check_package(args: argparse.Namespace) -> int:
    failed = False
    for _, path in package_entries(args.manifest):
        status, body = get_path(args.ship_url, args.cookie_jar, path)
        print(f"{status} {normalize_ship_url(args.ship_url)}/o{path}")
        if status != args.expect_status:
            failed = True
            print(body.decode("utf-8", errors="replace")[:2000], file=sys.stderr)
    return 1 if failed else 0


def cmd_cleanup_legacy(args: argparse.Namespace) -> int:
    for path in legacy_paths(args.lessons_dir, args.namespace):
        delete_endpoint(args.ship_url, args.cookie_jar, path)
        print(f"deleted legacy/test endpoint {path}")
    return 0


def cmd_check_all(args: argparse.Namespace) -> int:
    failed = False
    pairs = ordered_lesson_paths(args.lessons_dir, args.namespace, args.literal_names)
    for _, path in pairs:
        status, body = get_path(args.ship_url, args.cookie_jar, path)
        print(f"{status} {normalize_ship_url(args.ship_url)}/o{path}")
        if status != args.expect_status:
            failed = True
            text = body.decode("utf-8", errors="replace")[:2000]
            print(text, file=sys.stderr)
    return 1 if failed else 0


def cmd_routes(args: argparse.Namespace) -> int:
    pairs = ordered_lesson_paths(args.lessons_dir, args.namespace, args.literal_names)
    if args.json:
        print(json.dumps([{"lesson": str(lesson), "path": path} for lesson, path in pairs], indent=2))
    else:
        for lesson, path in pairs:
            print(f"{lesson.name}\t{path}")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Direct HTTP helper for sidecar %hawk499 lessons."
    )
    parser.add_argument("--ship-url", default=os.environ.get("SHIP_URL", "http://localhost:8080"))
    parser.add_argument(
        "--cookie-jar",
        type=Path,
        default=Path(os.environ.get("COOKIE_JAR", str(DEFAULT_COOKIE_JAR))),
    )
    sub = parser.add_subparsers(dest="command", required=True)

    login_p = sub.add_parser("login", help="authenticate with +code and write a cookie jar")
    login_p.add_argument("--code", help="web login code from +code; defaults to HAWK499_CODE")
    login_p.set_defaults(func=cmd_login)

    status_p = sub.add_parser("status", help="check whether the cookie jar reaches the private /i editor")
    status_p.set_defaults(func=cmd_status)

    install_p = sub.add_parser("install", help="install one lesson/source file to an endpoint path")
    install_p.add_argument("lesson", type=Path)
    install_p.add_argument("path", help="endpoint path, e.g. /learn/demo")
    install_p.set_defaults(func=cmd_install)

    put_p = sub.add_parser("put", help="general alias: put one source file at one endpoint path")
    put_p.add_argument("path", help="endpoint path, e.g. /apps/demo")
    put_p.add_argument("source", type=Path, help="source file to install")
    put_p.set_defaults(func=cmd_put)

    get_p = sub.add_parser("get", help="GET one installed runtime endpoint")
    get_p.add_argument("path", help="endpoint path, e.g. /apps/demo")
    get_p.add_argument("--output", "-o", type=Path, help="write response body to a file")
    get_p.add_argument("--auth", action="store_true", help="include auth cookie on the runtime GET")
    get_p.add_argument("--allow-error", action="store_true", help="return success even for HTTP >=400")
    get_p.set_defaults(func=cmd_get)

    check_one_p = sub.add_parser("check", help="GET one runtime endpoint and require a status")
    check_one_p.add_argument("path", help="endpoint path, e.g. /apps/demo")
    check_one_p.add_argument("--expect-status", type=int, default=200)
    check_one_p.set_defaults(func=cmd_check)

    list_p = sub.add_parser("list", help="scrape the editor sidebar and list known endpoints")
    list_p.add_argument("--prefix", help="only show paths with this prefix")
    list_p.add_argument("--all-nodes", action="store_true", help="include folder/tree nodes without endpoint handlers")
    list_p.add_argument("--json", action="store_true")
    list_p.set_defaults(func=cmd_list)

    move_p = sub.add_parser("move", help="move/rename a runtime endpoint")
    move_p.add_argument("old_path")
    move_p.add_argument("new_path")
    move_p.set_defaults(func=cmd_move)

    install_all_p = sub.add_parser("install-all", help="install every bundled lesson")
    add_lesson_args(install_all_p)
    install_all_p.set_defaults(func=cmd_install_all)

    delete_p = sub.add_parser("delete", help="delete one runtime endpoint path")
    delete_p.add_argument("path", help="endpoint path, e.g. /learn/demo")
    delete_p.set_defaults(func=cmd_delete)

    install_pkg_p = sub.add_parser("install-package", help="install endpoints from a JSON manifest")
    install_pkg_p.add_argument("manifest", type=Path)
    install_pkg_p.set_defaults(func=cmd_install_package)

    uninstall_pkg_p = sub.add_parser("uninstall-package", help="delete endpoints from a JSON manifest")
    uninstall_pkg_p.add_argument("manifest", type=Path)
    uninstall_pkg_p.set_defaults(func=cmd_uninstall_package)

    check_pkg_p = sub.add_parser("check-package", help="GET every endpoint in a JSON manifest")
    check_pkg_p.add_argument("manifest", type=Path)
    check_pkg_p.add_argument("--expect-status", type=int, default=200)
    check_pkg_p.set_defaults(func=cmd_check_package)

    cleanup_p = sub.add_parser("cleanup-legacy", help="delete legacy flat/test lesson endpoints")
    add_lesson_args(cleanup_p, include_literal=False)
    cleanup_p.set_defaults(func=cmd_cleanup_legacy)

    check_p = sub.add_parser("check-all", help="GET every bundled lesson route")
    add_lesson_args(check_p)
    check_p.add_argument("--expect-status", type=int, default=200)
    check_p.set_defaults(func=cmd_check_all)

    routes_p = sub.add_parser("routes", help="print lesson file to endpoint route mapping")
    add_lesson_args(routes_p)
    routes_p.add_argument("--json", action="store_true")
    routes_p.set_defaults(func=cmd_routes)

    return parser


def add_lesson_args(parser: argparse.ArgumentParser, include_literal: bool = True) -> None:
    parser.add_argument("--lessons-dir", type=Path, default=DEFAULT_LESSONS_DIR)
    parser.add_argument("--namespace", default=os.environ.get("HAWK499_LESSON_NAMESPACE", "/learn"))
    if include_literal:
        parser.add_argument(
            "--literal-names",
            action="store_true",
            help="use lesson filename stems as route labels instead of ordered sidebar labels",
        )


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return args.func(args)
    except Exception as exc:  # noqa: BLE001 - CLI should surface full context.
        print(f"error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
