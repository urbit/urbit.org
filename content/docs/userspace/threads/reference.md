+++
title = "Reference"
weight = 50
template = "doc.html"
+++

## Start thread

Poke `spider` with mark `%spider-start` and a vase containing `start-args`:

```hoon
+$  start-args
  [parent=(unit tid) use=(unit tid) =beak file=term =vase]
```

Where:

- `parent` - optional `tid` of parent thread if the thread is a child. If specified, the child thread will be killed with the parent thread ends.
- `use` - `tid` (thread ID) to give the new thread. Can be generated with something like `(scot %ta (cat 3 'my-agent_' (scot %uv (sham eny))))`. However you do it, make sure it's unique.
- `beak` - A `$beak` is a triple of `[p=ship q=desk r=case]`. `p` is always our ship, `q` is the desk which contains the thread we want to run. `r` is a `case`, which specifies a desk revision and is a tagged union of:
  ```hoon
  +$  case
    $%  [%da p=@da]      ::  date
        [%tas p=@tas]    ::  label
        [%ud p=@ud]      ::  number
    ==
  ```
  You'll almost always just want the current revision, so you can specify the `case` as `da+now.bowl`. If the thread is on the same desk as the agent you can also just use `byk.bowl(r da+now)` for the `beak`.
- `file` - name of the thread file in `/ted`. For example, if the thread you want to start is `/ted/foo/hoon` you'd specify `%foo`.
- `vase` - `vase` to be given to the thread when it's started. Can be whatever or just `!>(~)` if it doesn't need any args.

#### Example

```hoon
[%pass /some-path %agent [our.bowl %spider] %poke %spider-start !>([~ `tid byk.bowl %foo !>(~)])]
```

## Stop thread

Poke `spider` with mark `%spider-stop` and a vase containing `[tid ?]`, where:

- `tid` - the `tid` of the thread you want to stop
- `?` - whether thread should end nicely. If `%.y` it'll end with mark `%thread-done` and the bunt value of a vase. If `%.n` it'll end with mark `%thread-fail` and a `[term tang]` where `term` is `%cancelled` and `tang` is `~`.

#### Example

```hoon
[%pass /some-path %agent [our.bowl %spider] %poke %spider-stop !>([tid %.y)]
```

## Subscribe for result

Spider will send the result on `/thread-result/[tid]` so you can subscribe there for the result. You should subscribe before starting the thread.

The result will have a mark of either `%thread-fail` or `%thread-done`.

- `%thread-fail` - has a vase containing a `[term tang]` where `term` is an error message and `tang` is a traceback.
- `%thread-done` - has a vase of the result of the thread.

#### Example

```hoon
[%pass /some-path %agent [our.bowl %spider] %watch /thread-result/[tid]]
```

## Subscribe to thread

You can subscribe to a thread on `/thread/[tid]/path`. Note this is for facts sent off by the thread while it's running, not the final result. The path depends on the particular thread.

#### Example

```hoon
[%pass /some-path %agent [our.bowl %spider] %watch /thread/[tid]/thread-path]
```

## Poke thread

To poke a thread you poke spider with a mark of `%spider-input` and a vase of `[tid cage]`.

- `tid` is the tid of the thread you want to poke
- `cage` is whatever mark and vase you want to poke it with

#### Example

```hoon
[%pass /some-path %agent [our.bowl %spider] %poke %spider-input !>([tid %foo !>('foooo')])]
```
