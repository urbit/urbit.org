import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";
function ActiveLink({ children, href, className, currentPath }) {
    // special casing this behaviour which overloads one nav
    const archive = Boolean(
        currentPath === "/ecosystem?type=archive" && href === "/ecosystem"
    );
    const activeClassName = classnames({
        "text-wall-800": currentPath === href || archive,
        "text-wall-400": currentPath !== href && !archive,
    });

    return (
        <Link href={href} passHref>
            <a className={`${className} ${activeClassName}`}>{children}</a>
        </Link>
    );
}

export default function EcosystemSidebar() {
    const router = useRouter();
    let currentPath = router.asPath;
    return (
        <div className="flex flex-col space-y-2 pr-24">
            <ActiveLink
                currentPath={currentPath}
                className="type-ui"
                href="/ecosystem"
            >
                Spotlight
            </ActiveLink>
            <ActiveLink
                currentPath={currentPath}
                className="type-ui"
                href="/ecosystem?type=communities"
            >
                Communities
            </ActiveLink>
            <ActiveLink
                currentPath={currentPath}
                className="type-ui"
                href="/ecosystem?type=organizations"
            >
                Organizations
            </ActiveLink>

            <ActiveLink
                currentPath={currentPath}
                className="type-ui"
                href="/ecosystem?type=applications"
            >
                Applications
            </ActiveLink>
            <ActiveLink
                currentPath={currentPath}
                className="type-ui"
                href="/ecosystem?type=groups"
            >
                Groups
            </ActiveLink>
            <ActiveLink
                currentPath={currentPath}
                className="type-ui"
                href="/ecosystem?type=marketplaces"
            >
                Marketplaces
            </ActiveLink>
            <ActiveLink
                currentPath={currentPath}
                className="mr-5 type-ui"
                href="/ecosystem?type=podcasts"
            >
                Podcasts
            </ActiveLink>

            <ActiveLink
                currentPath={currentPath}
                className="mr-5 type-ui"
                href="/ecosystem?type=articles"
            >
                Articles
            </ActiveLink>
        </div>
    );
}