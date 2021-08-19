+++
title = "Workflow"
weight = 2
template = "doc.html"
+++

# Workflow Setup and Basic App Installation
To make Gall apps, it's important to work with your environment, not fight it.
Below we outline your main workflow options.

I'll assume throughout this that we are using the `%home` desk in a fake `~zod`.
If you want to brush up on using `mount` and `commit` to manage Urbit piers,
check the [Operator's Manual](/using/os/filesystem).

## Example Code
Below is a completely valid but *very* simple Gall program. You don't need to understand it yet: this lesson is purely about our development workflow.
```
/+  default-agent, dbug
|%
+$  versioned-state
    $%  state-0
    ==
+$  state-0  [%0 counter=@]
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this     .
    default   ~(. (default-agent this %|) bowl)
::
++  on-init
~&  >  'on-init'
  `this(state [%0 3])
++  on-save
  ^-  vase
  !>(state)
++  on-load
  ~&  >  'on-load'
  on-load:default
++  on-poke  on-poke:default
::
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-arvo   on-arvo:default
++  on-fail   on-fail:default
--
```

## Install Your First Gall App
To install a new program in Gall, you simply tell Gall its name with the
`|start` command, and Gall will look for a Hoon file with that name in the
`/app` directory.

### Install
To see this, create a Hoon file called `workflow.hoon` in the `/app` directory of your pier (e.g. `zod/home/app/workflow.hoon`) and paste the code above into it. Run the commands:
```
|commit %home
|start %workflow
```
You will see the output:
```
>   'on-init'
> 
>=
activated app home/workflow
[unlinked from [p=~zod q=%workflow]]
```

### Edit
Now let's edit this app. Change the line `~&  >  'on-load'` to 
```
~&  >  'I just loaded'
```
Run `|commit %home`, and you should see:
```
> |commit %home
>=
: /~zod/home/12/app/workflow/hoon
>   'I just loaded'
```

So we see here that once Gall has `start`ed an app, it auto-reloads it whenever
a new version of that program is committed. We'll go more into this in the
[lifecycle lesson](/docs/userspace/gall/guide/lifecycle.md)

### Troubleshooting: `:goad %force`
In some cases, Gall will not recompile your app. This can happen after an error is introduced and not fixed. To see the error again and force recompilation, run in the dojo:
```
:goad %force
```

## Using `dbug`
In line 2 of the code, we see `%- agent:dbug`. We'll explain how this works in
[the next lesson](/docs/userspace/gall/guide/arms.md), but for now, just know that it lets us run
`:workflow +dbug` in the dojo, and see the state of the agent. `dbug` determines
the state using the return value of our `on-save` arm.

```
> :workflow +dbug
::  prints:  [%0 counter=3]
```

## Three Workflow Options
The install and editing process shown above will always be the same. However, if
we simply develop apps in our pier, we have to take care not to lose them if we
start up a new `~zod` for development.

There are 2 primary workflows we can use to handle this issue.

1. Edit files directly in your mounted pier
2. Create a separate folder, edit files there, and copy or sync them to your pier

### Edit Files Directly in Your Pier
This will be familiar to anyone who has written simple Hoon generators. You
write the code, commit it, and then run it. Unfortunately, this makes it tricky
to put our code in version control and to save it even when we make a new
`~zod`. This is useful for really quick, one-off changes.

### Create a Separate Folder/Project
If you are writing a Gall app without a frontend (for example, a web server),
you can create a separate folder somewhere in your filesystem, edit files and
track changes there, and then copy them to your pier.

This can be done manually at the command line like so:
```
cp -r your_code_directory/* your_pier_directory/
```

Another option is to continually sync two directories:
```
watch rsync -zr --delete your_code_directory/* your_pier_directory/
```

You can also use a [script like this
one](https://github.com/timlucmiptev/gall-guide/blob/master/install.sh) to copy
all Gall directories to your pier.

## Faster Fakeship Startup
This can be used in combination with workflow option 1 above. Steps:
1. Create a fake ship
2. Run `|mount %` *as the first thing you do on the new fakeship*
3. Copy the pier directory to something like `backup-zod`
4. Do development as normal in method 1
5. When you want to reset your ship, just delete your normal `zod` directory
   (backing up code files of course), and copy your `backup-zod` directory to
   `zod/`.
6. Run `./urbit zod` to boot from your backup, skipping the ~5 min load process.

## Multiple Ships
Since Gall apps communicate between ships, it's sometimes useful in testing to make multiple ships and have them talk to each other. This is really easy: any fake ships you have on your local machine can see each other automatically. Just create them with `-F`
```
> ./urbit -F zod

# in another terminal window:
> ./urbit -F bus

::  In ~zod's Dojo, run
> |hi ~bus
::  you should see the hi confirmed
```
In the example above, `~zod` and `~bus` can now see each other. We'll use this extensively starting in the [poke and watch lesson](poke.md).

## `-L` Ships
Sometimes you want your development ships to have large datasets, such as the
data in a real ship of yours. In these cases, the best option is to run a real
ship with the `-L** command line flag, which turns off its networking so that
you can do dangerous operations and then delete the ship when you're done.

**Be careful with `-L` ships!**. If you don't follow the steps below
(particulary copying the "real" directory or starting with the `-L` flag), you
could have to breach.

To run an `-L` ship, do the following steps:
1. copy your existing ship's folder to a new folder, e.g.: `cp -r
   ~/ships/timluc-miptev ./fake-timluc`
2. run like so: `./urbit -L fake-timluc`

One less risky option is to use a secondary real planet for your `-L` ship: it
has real data, but is less of a hassle to breach it if you mess up.

## Our Approach
In the Backend Foundation, we will generally use approach (2), and copy our
files into a pier as we edit them.

## Workflow Summary for Gall
* Have a fake `~zod` running
* Mount it to your Linux/Mac
* get your file with Gall code into `/app`, commit, and run `|start %YOURAPPNAME`
* every time you edit, make sure your new file ends up in `/app` and that you
  commit.

## Exercises
### Getting Familiar
* Make a new project with one directory, `/app`, and create an install script
  (or modify `install.sh` above) so that you can copy the contents of `/app` to
  the `/app` directory in a pier of your choice.

### First Steps for `picky`
* On a real planet, make sure that you have a group with at least two chats and
  a couple members. You should be an owner or an admin or a group.
  - copy that ship's pier to a separate directory as `fake-ship` or similar
  - make sure you can run it with `./urbit -L fake-ship`

