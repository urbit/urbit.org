+++
title = "Custom Roller Tutorial"
weight = 11
template = "doc.html"
+++

This tutorial is an outline for how to set up your own L2 roller for Urbit. Some
familiarity with how L2 works in general, as well as the role of the roller, is
expected. See [Layer 2 Overview](/docs/azimuth/l2/layer2) for a technical
overview of L2, [Azimuth Data Flow](/docs/azimuth/flow) to gain an understanding
of how Azimuth data handling and processing is done on Urbit, and
[Rollers](docs/azimuth/l2/roller) for a short summary of what the different Gall
agents involved for rollers are. This tutorial is focused on setting up a roller
to work on the main Ethereum network, but only minor changes are needed to
utilize the Ropsten Ethereum network. We also explain how to set up a front end
(Bridge) from which transactions to be batched by the roller are sent, but use
of a front end is not mandatory.

Note that this process involves giving the private key of an Ethereum wallet to
the ship running the roller so that it may spend ETH to submit transactions. If you
do not fully understand what this entails, we recommend against running your own
roller on the Ethereum mainnet. See [below](#step2) for more information on
this.

Henceforth, by "roller" we are referring to the ship used as the transaction
aggregator and batch submitter, `%roller` refers to the Gall agent running on
the roller that performs these actions, and "front-end" refers to the optional
web GUI most users will use to interact with your roller (probably Bridge).

There are three main steps involved with setting up a roller:

- ensuring that the data in `%azimuth` is up to date,
- starting and configuring `%roller`,
- aiming your front-end at the roller

### 1. Make sure `%azimuth` state is up to date

If you are using an ordinary live ship on the network as the roller, you should
already have the latest `%azimuth` state and this step should not be necessary
and you may move to step 2.

If your roller is a fakezod, you will need to configure `%azimuth` to pull the
latest [Azimuth](/docs/azimuth/azimuth-eth) data from Ethereum. The most common
way to do this is via an Infura node, but you could instead use e.g. your own
Ethereum node. A free tier Infura node ought to be sufficient for most people
and is easy to set up using their tutorials.

To set up your fakezod to automatically receive Azimuth updates from the Infura
node, enter the following commands in dojo: `:azimuth %resub` followed by
`:azimuth|watch 'https://MAINNET_INFURA_URL' %default`. Here, the url can be
found under the Setting page for the node on infura.io listed under `ENDPOINTS`.

If you do not perform this step, you'll later see an error "roller not ready"
when the first roller batch is about to be submitted.

### 2. Starting and configuring `%roller` {#step2}

This step must be performed whether you're using a fakezod or a live ship.

First we need to start `%roller` and `%roller-rpc` (the agent used to send
commands to `%roller` via HTTP). If you are not making use of a front-end, and
instead will be accepting transactions to batch entirely from within Urbit,
`%roller-rpc` is not necessary. We assume you will be using Bridge as a
front-end.

To start the agents, enter the following command in dojo: `|rein %base [& %roller] [& %roller-rpc]`. You should see the following response:

```
gall: installing %roller-rpc
>   'init'
gall: installing %roller
>   %received-azimuth-state
```

Note that `%received-azimuth-state` only indicates that `%roller` successfully
subscribed to `%azimuth`; it does not indicate that you successfully completed
step 1.

Next we need to configure `%roller`. `%roller` has several parameters that can
be tweaked, such as how many transactions it will accept from a given ship in a
given time period, how long the time period is, how much gas to use, exceptions
to these rules for particular ships, etc. We will cover these in a moment, but
first there are two mandatory settings that must be configured: the Ethereum
node to submit batches to, and the private key for the wallet that will submit
the transactions.

First let's set the Ethereum node to which batches will be submitted, which we
will presume is an Infura node. This does not need to be the same node given in
step 1, but it is fine for them to be the same (assuming it is configured to
accept transactions - some Infura nodes are set up only to make blockchain data
available but do not participate in propagating transactions). Enter
`:roller|endpoint 'https://MAINNET_INFURA_URL' %mainnet` into dojo.

Next we set the private key for the Ethereum wallet from which batches built by
`%roller` will be submitted. We _strongly emphasize_ that this step has serious
security implications. _`%roller` will be able to spend ETH in this wallet._
This is mandatory, of course, as the primary function of `%roller` is to submit
batches of transactions to Ethereum, which requires ETH. If you downloaded
`%roller` from someone other than Tlon and have not personally audited their
code, you are putting the assets in this wallet at risk. Also keep in mind that
while Urbit has undergone several security audits, some components such as the
runtime have never been audited by a third party. We maintain a list of these
audits [here](/audits), as well as an
[FAQ](https://urbit.org/faq#how-secure-is-urbit) on the state of security in
Urbit. Thus we recommend a fresh wallet generated specifically to be used by
`%roller` and to only put the amount of ETH in it that you expect to need in the
near future. We also recommend that you only use this address for sending L2
batches, since otherwise the nonce will get out of sync. `%roller` can detect
this and handle it, but it could cause a delay in batch submission.

With that being said, the command to set the private key for the wallet to be
utilized by the roller is `:roller|setkey '0x1234567890abcdef'`, where `0x...`
is the private key.

The `:roller|endpoint` and `:roller|setkey` commands are the only mandatory
commands to set up the roller. At this point, if your roller is live on the
network (as opposed to a fakezod) and everything has been performed correctly,
it would be possible for others to submit transactions to it manually. All other
settings are sensible defaults at time of writing. However, to utilize a
front-end, one more command is needed: `|cors-approve 'https://YOUR_FRONTEND'`,
where the url is the address of the front end you're using - probably a modified
Bridge that you're hosting somewhere which you'll set up in the next step.
fakezods can only accept transactions from other ships it can talk to, namely
other fake ships running on the same machine, so you will need to set it up to
work with a front-end if you want to use it on livenet.

We cover the additional settings for `%roller` at the end.

### 3. Aiming Bridge at the roller

The last step is to set up the web interface by which users can submit
transactions to be batched by the roller, which we refer to as the front-end. We
presume here that you'll be using [Bridge](https://github.com/urbit/bridge), by
which we mean you'll be hosting a custom version of Bridge modified to use the
roller you set up above instead of Tlon's roller.

First you'll need to make the urbit running `%roller` accessible to the web.
This is outside the scope of the tutorial, but we suggest using a tool like
`caddy` or `nginx`. You'll want to set up a URL such as
`https://myroller.sampel-pal.net` and use the port you'd ordinarily use to
access Landscape, probably `80` or `8080`. To be clear, this is the same process
you'd use if you set up a custom URL to access your urbit hosted in the cloud.

To point Bridge at your roller we [launch
Bridge](https://github.com/urbit/bridge/blob/master/DEVELOPMENT.md) with a
custom command that modifies an environment variable called
`REACT_APP_ROLLER_HOST`:

```
REACT_APP_ROLLER_HOST=https://myroller.sampel-pal.net npm run pilot-mainnet
```

This will launch a server running Bridge that utilizes the mainnet roller you
set up at `https://myroller.sampel-pal.net`.

### Additional `%roller` commmands

`%roller` has a few other settings and commands for managing things like the
rate at which transactions are submitted and manually submitting batches. These
can be modified using the following generators:

<table>
  <thead><tr><th>Dojo Command</th><th>Description</th><th>Argument</th></tr></thead>
<tbody>
  <tr>
    <td><code>:roller|commit</code></td>
    <td>Submits a new L2 batch with all pending transactions.</td>
    <td>None.</td>
  </tr>
  <tr>
    <td><code>:roller|config</code></td>
    <td>General configuration command.</td>
    <td><code>$config</code> (see <code>/sur/dice.hoon</code>)</td>
  </tr>
  <tr>
    <td><code>:roller|endpoint</code></td>
    <td>Set the Infura endpoint.</td>
    <td><code>[@t ?(%mainnet %ropsten %local)]</code></td>
  </tr>
  <tr>
    <td><code>:roller|frequency</code></td>
    <td>Sets the frequency at which batches are submitted.</td>
    <td><code>@dr</code></td>
  </tr>
  <tr>
    <td><code>:roller|local</code></td>
    <td>Configures <code>%roller</code> to listen to a local Ethereum node at port 8545.</td>
    <td>None.</td>
  </tr>
  <tr>
    <td><code>:roller|quota</code></td>
    <td>Modified the number of txs a ship is allowed to send per unit time.</td>
    <td><code>@ud</code></td>
  </tr>
  <tr>
    <td><code>:roller|ropsten</code></td>
    <td>Configure %roller to listen to a preset Ropsten Infura node.</td>
    <td>None.</td>
  </tr>
  <tr>
    <td><code>:roller|setkey</code></td>
    <td>Load a private key into the roller and retrieves its L1 nonce.</td>
    <td><code>@t</code></td>
  </tr>
  <tr>
    <td><code>:roller|slice</code></td>
    <td>Modified the unit of time for each ship's quota.</td>
    <td><code>@dr</code></td>
  </tr>
</tbody>
</table>
