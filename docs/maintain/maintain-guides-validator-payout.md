---
id: maintain-guides-validator-payout
title: Validator Payout Overview
sidebar_label: Validator Payout Overview
slug: ../maintain-guides-validator-payout
---

## Era Points

For every era (a period of time approximately 24 hours in
AXIA), validators are paid proportionally to the amount of _era points_ they have collected. Era
points are reward points earned for payable actions like:

- issuing validity statements for [allychain](../learn/learn-allychains.md) blocks.
- producing a non-uncle block in the Relay Chain.
- producing a reference to a previously unreferenced uncle block.
- producing a referenced uncle block.

_Note: An uncle block is a Relay Chain block that is valid in every regard, but which failed to
become canonical. This can happen when two or more validators are block producers in a single slot,
and the block produced by one validator reaches the next block producer before the others. We call
the lagging blocks uncle blocks._

Payments occur at the end of every era.

## Payout Scheme

No matter how much total stake is behind a validator, all validators split the block authoring
payout essentially equally. The payout of a specific validator, however, may differ based on
[era points](#era-points), as described above. Although there is a probabilistic component to
receiving era points, and they may be impacted slightly depending on factors such as network
connectivity, well-behaving validators should generally average out to having similar era point
totals over a large number of eras.

Validators may also receive "tips" from senders as an incentive to include transactions in their
produced blocks. Validators will receive 100% of these tips directly.

Validators will receive staking rewards in the form of the native token of that chain (AXC for AXIA).

For simplicity, the examples below will assume all validators have the same amount of era points,
and received no tips.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 tokens
Validator 2 Stake (v2):  9 tokens
Validator 3 Stake (v3):  8 tokens
Validator 4 Stake (v4):  7 tokens
Payout (p): 8 AXC

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 tokens
```

Note that this is different than most other Proof-of-Stake systems such as Cosmos. As long as a
validator is in the validator set, it will receive the same block reward as every other validator.
Validator `v1`, who had 18 tokens staked, received the same reward (2 tokens) in this era as `v4`
who had only 7 tokens staked.

## Running Multiple Validators

It is possible for a single entity to run multiple validators. Running multiple validators may
provide a better risk/reward ratio. Assuming you have enough AXC, or enough stake nominates your
validator, to ensure that your validators remain in the validator set, running multiple validators
will result in a higher return than running a single validator.

For the following example, assume you have 18 AXC to stake. For simplicity's sake, we will ignore
nominators. Running a single validator, as in the example above, would net you 2 AXC in this era.

Note that while AXC is used as an example.
```
Validator Set Size (v): 4
Validator 1 Stake (v1): 18 AXC <- Your validator
Validator 2 Stake (v2):  9 AXC
Validator 3 Stake (v3):  8 AXC
Validator 4 Stake (v4):  7 AXC
Payout (p): 8 AXC

Your payout = (p / v) * 1 = (8 / 4) * 1 = 2
```

Running two validators, and splitting the stake equally, would result in the original validator `v4`
to be kicked out of the validator set, as only the top `v` validators (as measured by stake) are
selected to be in the validator set. More important, it would also double the reward that you get
from each era.

```
Validator Set Size (v): 4
Validator 1 Stake (v1): 9 AXC <- Your first validator
Validator 2 Stake (v2): 9 AXC <- Your second validator
Validator 3 Stake (v3): 9 AXC
Validator 4 Stake (v4): 8 AXC
Payout (p): 8 AXC

Your payout = (p / v) * 2 = (8 / 4) * 2 = 4
```

With enough stake, you could run more than two validators. However, each validator must have enough
stake behind it to be in the validator set.

The incentives of the system favor equally-staked validators. This works out to be a dynamic, rather
than static, equilibrium. Potential validators will run different numbers of validators and apply
different amounts of stake to them as time goes on, and in response to the actions of other
validators on the network.

## Slashing

Although rewards are paid equally, slashes are relative to a validator's stake. Therefore, if you do
have enough AXC to run multiple validators, it is in your best interest to do so. A slash of 30%
will, of course, be more AXC for a validator with 18 AXC staked than one with 9 AXC staked.

Running multiple validators does not absolve you of the consequences of misbehavior. AXIA
punishes attacks that appear coordinated more severely than individual attacks. You should not, for
example, run multiple validators hosted on the same infrastructure. A proper multi-validator
configuration would ensure that they do not fail simultaneously.

Nominators have the incentive to nominate the lowest-staked validator, as this will result in the
lowest risk and highest reward. This is due to the fact that while their vulnerability to slashing
remains the same (since it is percentage-based), their rewards are higher since they will be a
higher proportion of the total stake allocated to that validator.

To clarify this, let us imagine two validators, `v1` and `v2`. Assume both are in the active set,
have commission set to 0%, and are well-behaved. The only difference is that `v1` has 90 AXC
nominating it and `v2` only has 10. If you nominate `v1`, it now has `90 + 10 = 100` AXC, and you
will get 10% of the staking rewards for the next era. If you nominate `v2`, it now has
`10 + 10 = 20` AXC nominating it, and you will get 50% of the staking rewards for the next era. In
actuality, it would be quite rare to see such a large difference between the stake of validators,
but the same principle holds even for smaller differences. If there is a 10% slash of either
validator, then you will lose 1 AXC in each case.

## Nominators and Validator Payments

Nominated stake allows you to "vote" for validators and share in the rewards (and slashing) without
running a validator node yourself. Validators can choose to keep a percentage of the rewards due to
their validator to "reimburse" themselves for the cost of running a validator node. Other than that,
all rewards are shared based on the stake behind each validator. This includes the stake of the
validator itself, plus any stake bonded by nominators.

> **NOTE:** Validators set their preference as a percentage of the block reward, _not_ an absolute
> number of AXC. AXIA's block reward is based on the _total_ amount at stake, with the reward
> peaking when the amount staked is at 50% of the total supply. The commission is set as the amount
> taken by the validator; that is, 0% commission means that the validator does not receive any
> proportion of the rewards besides that owed to it from self-stake, and 100% commission means that
> the validator operator gets all rewards and gives none to its nominators.

In the following examples, we can see the results of several different validator payment schemes and
split between nominator and validator stake. We will assume a single nominator for each validator.
However, there can be numerous nominators for each validator. Rewards are still distributed
proportionally - for example, if the total rewards to be given to nominators is 2 AXC, and there are
four nominators with equal stake bonded, each will receive 0.5 AXC. Note also that a single
nominator may stake different validators.

Each validator in the example has selected a different validator payment (that is, a percentage of
the reward set aside directly for the validator before sharing with all bonded stake). The
validator's payment percentage is listed in
brackets (`[]`) next to each validator. Note that since the validator payment is public knowledge,
having a low or non-existent validator payment may attract more stake from nominators, since they
know they will receive a larger reward.

```
Validator Set Size (v): 4
Validator 1 Stake (v1) [20% commission]: 18 AXC (9 validator, 9 nominator)
Validator 2 Stake (v2) [40% commission]:  9 AXC (3 validator, 6 nominator)
Validator 3 Stake (v3) [10% commission]:  8 AXC (4 validator, 4 nominator)
Validator 4 Stake (v4) [ 0% commission]:  6 AXC (1 validator, 5 nominator)
Payout (p): 8 AXC

Payout for each validator (v1 - v4):
p / v = 8 / 4 = 2 AXC

v1:
(0.2 * 2) = 0.4 AXC -> validator payment
(2 - 0.4) = 1.6 -> shared between all stake
(9 / 18) * 1.6 = 0.8 -> validator stake share
(9 / 18) * 1.6 = 0.8 -> nominator stake share
v1 validator total reward: 0.4 + 0.8 = 1.2 AXC
v1 nominator reward: 0.8 AXC

v2:
(0.4 * 2) = 0.8 AXC -> validator payment
(2 - 0.8) = 1.2 -> shared between all stake
(3 / 9) * 1.2 = 0.4 -> validator stake share
(6 / 9) * 1.2 = 0.8 -> nominator stake share
v2 validator total reward: 0.8 + 0.4 = 1.2 AXC
v2 nominator reward: 0.8 AXC

v3:
(0.1 * 2) = 0.2 AXC -> validator payment
(2 - 0.2) = 1.8 -> shared between all stake
(4 / 8) * 1.8 = 0.9 -> validator stake share
(4 / 8) * 1.8 = 0.9 -> nominator stake share
v3 validator total reward: 0.2 + 0.9 AXC = 1.1 AXC
v3 nominator reward: 0.9 AXC

v4:
(0 * 2) = 0 AXC -> validator payment
(2 - 0) = 2.0 -> shared between all stake
(1 / 6) * 2 = 0.33 -> validator stake share
(5 / 6) * 2 = 1.67 -> nominator stake share
v4 validator total reward: 0 + 0.33 AXC = 0.33 AXC
v4 nominator reward: 1.67 AXC
```
