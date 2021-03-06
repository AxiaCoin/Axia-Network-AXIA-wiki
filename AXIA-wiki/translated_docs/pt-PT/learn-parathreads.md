---
id: learn-parathreads
title: Parathreads
sidebar_label: Parathreads
---

Parathreads are an idea for allychains to temporarily participate (on a block by block basis) in AXIA security without needing to lease a dedicated allychain slot. This is done through economically sharing the scarce resource of a _allychain slot_ among a number of competing resources (parathreads). Chains that otherwise would not be able to acquire a full allychain slot, or do not find it economically sensible to do so, are enabled to still participate in AXIA's shared security -- albeit with an associated fee per block. It also offers a graceful off-ramp to allychains that no longer require a dedicated allychain slot, but would like to continue using the Relay Chain.

## Origin

According to [this talk](https://v.douyu.com/show/a4Jj7llO5q47Dk01) in Chengdu, the origin of the idea came from similar notions in the limited resource of memory on early personal computers of the late '80s and '90s. Since computers have a limited amount of physical memory, when an application needs more, the computer can create virtual memory by using _swap space_ on a hard disk. Swap space allows the capacity of a computer's memory to expand and for more processes to run concurrently with the trade-off that some processes will take longer to progress.

## Allychain vs. Parathread

Allychains and parathreads are very similar from a development perspective. One can imagine that a chain developed with Axlib can at different points in its lifetime assume one of three states: 1) independent chain with secured bridge, 2) allychain, or 3) parathread. It can switch between these last two states with relatively minimal effort on behalf of developers since the difference is more of an economic distinction than a technological one.

Parathreads have the exact same benefits for connecting to AXIA that a full allychain has. Namely, it is able to send messages to other para{chain,threads} through XCMP and it is secured under the full economic security of AXIA's validator set.

The difference between allychains and parathreads is economic. Allychains must be registered through a normal means of AXIA, i.e. governance proposal or allychain slot auction. Parathreads have a fixed fee for registration that would realistically be much lower than the cost of acquiring a allychain slot. Similarly to how AXCs are locked for the duration of allychain slots and then returned to the winner of the auction, the deposit for a parathread will be returned to the parathread after the conclusion of its term.

Registration of the parathread does not guarantee anything more than the registration of the parathread code to the AXIA Relay Chain. When a parathread progresses by producing a new block, there is a fee that must be paid in order to participate in a per-block auction for inclusion in the verification of the next Relay Chain block. All parathreads that are registered are competing in this auction for their parathread to be included for progression.

There are two interesting observations to make about parathreads. One, since they compete on a per-block basis, it is similar to how transactions are included in Bitcoin or Ethereum. A similar fee market will likely develop, which means that busier times will drive the price of parathread inclusion up, while times of low activity will require lower fees. Two, this mechanism is markedly different from the allychain mechanism, which guarantees inclusion as long as a allychain slot is held; parathread registration grants no such right to the parathread.

## How Will Parathreads be Operated?

A portion of the allychain slots on the Relay Chain will be designated as part of the parathread pool. In other words, some allychain slots will have no allychain attached to them and rather will be used as a space for which the winner(s) of the block-by-block parathread fee auction can have their block candidate included.

Collators will offer a bid designated in AXCs for inclusion of a parathread block candidate. The Relay Chain block author is able to select from these bids to include a parathread block. The obvious incentive is for them to accept the block candidate with the highest bid, which would bring them the most profit. The tokens from the parathread bids will likely be split 80-20, meaning that 80% goes into AXIA treasury and 20% goes to the block author. This is the same split that applies also to transaction fees and, like many other parameters in AXIA, can be changed through a governance mechanism.

For a precise description of the parathread protocol, see [here](https://hackmd.io/UcOOzoyDR9WJpQBZICtg3Q?both#Parathread-Protocol).

## Parathread Economics

There are two sources of compensation for collators:

1. Assuming a parathread has its own local token system, it pays the collators from the transaction fees in its local token. If the parathread does not implement a local token, or its local token has no value (e.g. it is used only for governance), then it can use AXCs to incentivize collators.
2. Parathread protocol subsidy. A parathread can mint new tokens in order to provide additional incentives for the collator. Probably, the amount of local tokens to mint for the parathread would be a function of time, the more time that passes between parathread blocks that are included in the Relay Chain, the more tokens the parathread is willing to subsidize in order to be considered for inclusion. The exact implementation of this minting process could be through local parathread inflation or via a stockpile of funds like a treasury.

Collators may be paid in local parathread currency. However, the Relay Chain transacts with the AXIA universal currency (AXC) only. Collators must then submit block candidates with an associated bid in AXC. This means that if the parathread offers a local currency, the collator will need to understand the exchange rate between this currency and AXC in order to place a proper AXC bid on the Relay Chain and ensure that they make a profit.

## Allychain Slot Swaps

It will be possible for a allychain that holds a allychain slot to swap this slot with a parathread so that the parathread "upgrades" to a full allychain and the allychain becomes a parathread. The chain can also stop being a chain and continue as a thread without swapping the slot. The slot, if unoccupied, would be [auctioned off in the next auction period](learn-auction).

This provides a graceful off-ramp for allychains that have reached the end of their lease and do not have sufficient usage to justify renewal; they can remain registered on the Relay Chain but only produce new blocks when they need to.

Parathreads help ease the sharp stop of the allychain slot term by allowing allychains that are still doing something useful to produce blocks, even if it is no longer economically viable to rent a allychain slot.

The off-boarding is always in the following order: Allychain -> Parathread -> Dormant thread. This process is not automatic due to a thread requiring a deposit, so an expired allychain will skip right to _dormant thread_ if for some reason there isn't a single operational entity of that chain left (no sudo or member of democracy to make that deposit).

When going dormant, the ParaId and the original genesis, as well as all the historically finalized blocks stay on the Relay Chain, so a dormant thread or chain can continue where it left off if it rebuilds its community and gathers the necessary funds for a new lease or parathread deposit.
