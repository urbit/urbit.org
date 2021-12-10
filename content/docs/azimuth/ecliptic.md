+++
title = "Ecliptic.eth"
weight = 6
template = "doc.html"
+++

[Ecliptic.eth](https://etherscan.io/address/ecliptic.eth) holds the business
logic for the ledger kept by `Azimuth.eth`. It may be modified by [galaxy
vote](/docs/glossary/upgrade). This determines things such as what the various
proxies are capable of, how keys are changed, or verifying that a request is
valid.

`Ecliptic.eth` uses external contracts such as
[Azimuth.eth](/docs/azimuth/azimuth-eth) and
[Polls](https://github.com/urbit/azimuth/blob/master/contracts/Polls.sol) for
data storage so that it can easily be replaced in case the logic needs to be
changed without affecting the data. These data contracts are owned by
`Ecliptic.eth`, and this ownership is passed to the new Ecliptic contract
whenever it is replaced. Thus it is advised for clients to not store Ecliptic's
contract address directly, but instead ask the `Azimuth.eth` contract for its
`owner` attribute to ensure that transactions are sent to the latest Ecliptic
contract. Alternatively, the [ENS](https://ens.domains/) name `Ecliptic.eth`
will always resolve to the latest Ecliptic.

You can read about [Urbit's first
upgrade](https://github.com/urbit/azimuth/pull/35) to Ecliptic, which occurred
in the summer of 2021, [here](https://urbit.org/blog/first-contract). The
[second](https://github.com/urbit/azimuth/pull/43) occurred later in the year
and consisted of several small modifications to ready the PKI for the
introduction of [naive rollups](/docs/azimuth/l2/layer2).

`Ecliptic.eth` implements the [ERC-721](https://eips.ethereum.org/EIPS/eip-721)
interface for non-fungible tokens, as well as the
[ERC-165](https://eips.ethereum.org/EIPS/eip-165) standard for interface
detection.

There are currently [28 functions](#write) which may be called to write to
the Ecliptic, and [17 functions](#read) to read data from the Ecliptic. Many of these
have a corresponding [layer 2 action](/docs/azimuth/l2/l2-actions), and/or can be
performed using [Bridge](/using/id/using-bridge). We note these facts where
applicable.

## Write functions {#write}

Here we briefly describe each function in `Ecliptic.eth` which allows one to write
data to Ethereum. These can be called using
[Etherscan](https://etherscan.io/address/ecliptic.eth#writeContract), but
the most common functions may be called from within Bridge.

We only document here the write functions specific to `Ecliptic.eth` and not the
standard functions that are part of the ERC-721 or ERC-165 interfaces.

### `Point`s interface

These functions are available to each owner of a
[`Point`](/docs/azimuth/azimuth-eth#points), and a subset of them are available
to its [proxies](#proxies). All of these actions may be performed from Bridge.

#### `configureKeys`

```solidity
    function configureKeys(uint32 _point,
                           bytes32 _encryptionKey,
                           bytes32 _authenticationKey,
                           uint32 _cryptoSuiteVersion,
                           bool _discontinuous)
```

Configure `_point` with network public keys `_encryptionKey`,
`_authenticationKey`, and corresponding `_cryptoSuiteVersion`, incrementing the
`Point`'s [`keyRevisionNumber`](/docs/azimuth/azimuth-eth#points) if the keys
have changed and `continuityNumber` number if `_discontinuous` is set to true
(see [Life and Rift](/docs/azimuth/life-and-rift)).

Corresponds to the layer 2 `%configure-keys` action.

#### `spawn`

```solidity
    function spawn(uint32 _point, address _target)
```

Spawn `_point`, then either give, or allow `_target` to take, ownership of `_point`.

If `_target` is the `:msg.sender`, `_target` owns the `_point` right away.
otherwise, `_target` becomes the transfer proxy of `_point`.

Requirements:

- `_point` must not be active
- `_point` must not be a planet with a galaxy prefix
- `_point`'s prefix must be linked and under its spawn limit
- `:msg.sender` must be either the owner of `_point`'s prefix, or an authorized spawn proxy for it

Corresponds to the layer 2 `%spawn` action.

#### `transferPoint`

```solidity
    function transferPoint(uint32 _point, address _target, bool _reset)
```

Transfer `_point` to `_target`, clearing all permissions data and keys if
`_reset` is true. `_reset` set to makes this transaction a
[breach](/using/id/guide-to-resets), and thus this action increments the
[`continuityNumber`](/docs/azimuth/azimuth-eth#points) of `_point`, and usually
the `keyRevisionNumber` as well (see [Life and
Rift](/docs/azimuth/life-and-rift)).

Requirements:

- `:msg.sender` must be either `_point`'s current owner, authorized to transfer
  `_point`, or authorized to transfer the current owner's points (i.e. is
  listed as an ERC-721 operator in [`operators`](/docs/azimuth/azimuth-eth#other)).
- `_target` must not be the zero address.

Corresponds to the layer 2 `%transfer-point` action.

#### `escape`

```solidity
    function escape(uint32 _point, uint32 _sponsor)
```

Request escape as `_point` to `_sponsor`.

If an escape request is already active, this overwrites the existing request.

Requirements:

- `:msg.sender` must be the owner or manager of `_point`,
- `_point` must be able to escape to `_sponsor` as per to `canEscapeTo()`

Corresponds to the layer 2 `%escape` action.

#### `cancelEscape`

```solidity
    function cancelEscape(uint32 _point)
```

Cancel the currently set escape for `_point`.

Corresponds to the layer 2 `%cancel-escape` action.

#### `adopt`

```solidity
    function adopt(uint32 _point)
```

As the relevant sponsor, accept the `_point`.

Requirements:

- `:msg.sender` must be the owner or management proxy
  of `_point`'s requested sponsor

Corresponds to the layer 2 `%adopt` action.

#### `reject`

```solidity
    function reject(uint32 _point)
```

As the relevant sponsor, deny the `_point`'s `adopt` request.

Requirements:

- `:msg.sender` must be the owner or management proxy
  of `_point`'s requested sponsor

Corresponds to the layer 2 `%reject` action.

#### `detach`

```solidity
    function detach(uint32 _point)
```

As the `_sponsor`, stop sponsoring the `_point`.

Requirements:

- `:msg.sender` must be the owner or management proxy
  of `_point`'s current sponsor

Corresponds to the layer 2 `%detach` action.

Unlike all other layer 1 actions, layer 1 sponsors may use a layer 1 `detach` on
a layer 2 sponsee. See the [Layer 2](/docs/azimuth/l2/layer2#sponsorship)
section for more detail. The detach action available in Bridge is a layer 2
action, so a layer 1 detach must be done
[manually](https://etherscan.io/address/ecliptic.eth#writeContract).

### Proxy management {#proxies}

These functions are used to manage the various
[proxies](/docs/using/id/proxies). All of these actions may be performed from Bridge.

#### `setManagementProxy`

```solidity
    function setManagementProxy(uint32 _point, address _manager)
```

Configure the management proxy for `_point`.

The management proxy may perform "reversible" operations on
behalf of the owner. This includes public key configuration and
operations relating to sponsorship.

Requirements:

- `:msg.sender` must be either `_point`'s current owner or the management proxy.

Corresponds to the layer 2 `%set-management-proxy` action.

#### `setSpawnProxy`

```solidity
    function setSpawnProxy(uint16 _prefix, address _spawnProxy)
```

Give `_spawnProxy` the right to spawn points with the prefix `_prefix` using the
`spawn` function.

Requirements:

- `:msg.sender` must be either `_point`'s current owner or the spawn proxy.

Corresponds to the layer 2 `%set-spawn-proxy` action.

#### `setVotingProxy`

```solidity
    function setVotingProxy(uint8 _galaxy, address _voter)
```

Configure the voting proxy for `_galaxy`.

The voting proxy is allowed to start polls and cast votes on the point's behalf.

Requirements:

- `:msg.sender` must be either `_point`'s current owner or the voting proxy.

There is no corresponding layer 2 action since voting must occur on layer 1.

#### `setTransferProxy`

```solidity
    function setTransferProxy(uint32 _point, address _transferProxy)
```

Give `_transferProxy` the right to transfer `_point`.

Requirements:

- `:msg.sender` must be either `_point`'s current owner, an operator for the
  current owner, or the transfer proxy.

Corresponds to the layer 2 `%set-transfer-proxy` action.

### Poll actions

Most of these are functions only available to galaxies. They are related to
[voting](/docs/glossary/voting). As voting does not occur on layer 2, there are
no corresponding layer 2 actions for poll actions.

Upgrade and document polls last for 30 days, or once a majority is achieved,
whichever comes first. If a majority (129) of yes or no votes is achieved, the
final vote cast in favor of the winning option also triggers `updateUpgradePoll`
or `updateDocumentPoll` as appropriate. Otherwise, if a quorum of 64 votes is
achieved, with a majority voting for yes, and the 30 day voting period has
expired, then _any_ Ethereum address may call `updateUpgradePoll` or
`updateDocumentPoll` as appropriate.

#### `startUpgradePoll`

```solidity
    function startUpgradePoll(uint8 _galaxy, EclipticBase _proposal)
```

As `_galaxy`, start a poll for the Ecliptic upgrade `_proposal`.

Requirements:

- `:msg.sender` must be the owner or voting proxy of `_galaxy`,
- the `_proposal` must expect to be upgraded from this specific
  contract, as indicated by its `previousEcliptic` attribute.

This action must be performed manually - it is not available in Bridge.

#### `startDocumentPoll`

```solidity
    function startDocumentPoll(uint8 _galaxy, bytes32 _proposal)
```

As `_galaxy`, start a poll for the `_proposal`. Document polls last for 30 days,
or once a majority is achieved, whichever comes first.

The `_proposal` argument is the keccak-256 hash of any arbitrary
document or string of text.

This action must be performed manually - it is not available in Bridge.

#### `castUpgradeVote`

```solidity
    function castUpgradeVote(uint8 _galaxy,
                              EclipticBase _proposal,
                              bool _vote)
```

As `_galaxy`, cast a `_vote` on the Ecliptic upgrade `_proposal`.

`_vote` is true when in favor of the proposal, false otherwise.

This action may be performed from Bridge.

#### `castDocumentVote`

```solidity
    function castDocumentVote(uint8 _galaxy, bytes32 _proposal, bool _vote)
```

As `_galaxy`, cast a `_vote` on the `_proposal`.

`_vote` is true when in favor of the proposal, false otherwise.

This action may be performed from Bridge.

#### `updateUpgradePoll`

```solidity
    function updateUpgradePoll(EclipticBase _proposal)
```

Check whether the `_proposal` has achieved majority, upgrading to it if it has.
Any Ethereum address may call this function.

This action eiher occurs as part of a vote that achieves a majority, or must be
performed manually. It is not available in Bridge.

#### `updateDocumentPoll`

```solidity
    function updateDocumentPoll(bytes32 _proposal)
```

Check whether the `_proposal` has achieved majority. Any Ethereum address may
call this function.

This action eiher occurs as part of a vote that achieves a majority, or must be
performed manually. It is not available in Bridge.

### Contract owner operations

The following functions may only be performed by the owner of the contract.
There are only two such functions, one of which is to spawn galaxies. As all
galaxies have already been spawned, it is no longer of any use. Thus only
`setDnsDomains` is relevant today.

#### `createGalaxy`

```solidity
    function createGalaxy(uint8 _galaxy, address _target)
```

Grant `_target` ownership of the `_galaxy` and register it for voting. Galaxies
are given by a `uint8`, and since all 256 galaxies have already been spawned,
this function has no valid arguments.

#### `setDnsDomains`

```solidity
    function setDnsDomains(string _primary, string _secondary, string _tertiary)
```

Sets 3 DNS domains by which galaxy IP addresses may be looked up as part of the
bootstrap process to get on the network. Currently, all three domains are `urbit.org`.

## Read functions {#read}

Here we briefly describe each function in the Ecliptic which allows one to read
data from the contract. These can be called using
[Etherscan](https://etherscan.io/address/ecliptic.eth#readContract).

We only document here the read functions specific to Ecliptic and not the
standard functions that are part of the ERC-721 or ERC-165 interfaces.

#### `depositAddress`

This returns the deposit address for [layer 2](/docs/azimuth/l2/layer2), which is
`0x1111111111111111111111111111111111111111`. Ships sent to this address are
controlled on layer 2 instead of via Ecliptic.

#### `canEscapeTo`

```solidity
    function canEscapeTo(uint32 _point, uint32 _sponsor)
```

Returns a `bool` that is true if `_point` could try to escape to `_sponsor`.

#### `azimuth`

Returns the address of the [Azimuth.eth](/docs/azimuth/azimuth-eth) contract: `0x223c067f8cf28ae173ee5cafea60ca44c335fecb`.

#### `claims`

Returns the address of the
[Claims](https://etherscan.io/address/0xe7e7f69b34d7d9bd8d61fb22c33b22708947971a)
contract: `0x1df4ea30e0b1359c9692a161c5f30cd1a6b64ebf`.

#### `polls`

Returns the address of the
[Polls](https://etherscan.io/address/0x7fecab617c868bb5996d99d95200d2fa708218e4)
contract: `0x7fecab617c868bb5996d99d95200d2fa708218e4`.

#### `previousEcliptic`

Returns the address of the previous Ecliptic address.

#### `getSpawnLimit`

```solidity
    function getSpawnLimit(uint32 _point, uint256 _time)
```

Returns a `uint32` that is the total number of children the `_point` is allowed
to spawn at `_time`.

There is no limit for galaxies. Instead, for most galaxies, all stars have
already been spawned and placed into one of the lockup contracts: [Linear Star
Release](https://etherscan.io/address/0x86cd9cd0992f04231751e3761de45cecea5d1801)
and [Conditional Star
Release](https://etherscan.io/address/0x8c241098c3d3498fe1261421633fd57986d74aea).

Beginning in 2019, stars may spawn at most 1024 planets. This limit doubles
every subsequent year until the maximum is reached. However, this limit is not
currently implemented on [Layer 2](/docs/azimuth/l2/layer2).
