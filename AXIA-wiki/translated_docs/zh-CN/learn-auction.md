---
id: learn-auction
title: 平行链插槽拍卖
sidebar_label: 平行链插槽拍卖
---

For a [allychain](learn-allychains) to be added to AXIA it must inhabit one of the available allychain slots. A allychain slot is a scarce resource on AXIA and only a limited number will be available. As allychains ramp up there may only be a few slots that are unlocked every few months. The goal is to eventually have 100 allychain slots available on AXIA (these will be split between allychains and the [parathread pool](learn-parathreads)). If a allychain wants to have guaranteed block inclusion at every Relay Chain block, it must acquire a allychain slot.

The allychain slots of AXIA will be sold according to an unpermissioned [candle auction](https://en.wikipedia.org/wiki/Candle_auction) that has been slightly modified to be secure on a blockchain.

## 蜡烛(Candle)拍卖机制

Candle auctions are a variant of open auctions where bidders submit bids that are increasingly higher and the highest bidder at the conclusion of the auction is considered the winner.

Candle auctions were originally employed in 16th century for the sale of ships and get their name from the "inch of a candle" that determined the open period of the auction. When the flame extinguished and the candle went out, the auction would suddenly terminate and the standing bid at that point would win.

When candle auctions are used online, they require a random number to decide the moment of termination.

Allychain slot auctions will differ slightly from a normal candle auction in that it does not use the random number to decide the duration of its opening phase. Instead, it has a known open phase and will be retroactively determined (at the normal close) to have ended at some point in the past. So during the open phase, bids will continue to be accepted, but later bids have higher probability of losing since the retroactively determined close moment may be found to have preceded the time that a bid was submitted.

## Rationale

The open and transparent nature of blockchain systems opens attack vectors that are non-existent in traditional auction formats. Normal open auctions in particular can be vulnerable to _auction sniping_ when implemented over the internet or on a blockchain.

Auction sniping takes place when the end of an auction is known and bidders are hesitant to bid their true price early, in hopes of paying less than they actually value the item.

For example, Alice may value an item at auction for 30 USD. She submits an initial bid of 10 USD in hopes of acquiring the items at a lower price. Alice's strategy is to place incrementally higher bids until her true value of 30 USD is exceeded. Another bidder Eve values the same item at 11 USD. Eve's strategy is to watch the auction and submit a bid of 11 USD at the last second. Alice will have no time to respond to this bid before the close of the auction and will lose the item. The auction mechanism is sub-optimal because it has not discovered the true price of the item and the item has not gone to the actor who valued it the most.

On blockchains this problem may be even worse, since it potentially gives the producer of the block an opportunity to snipe any auction at the last concluding block by adding it themselves and/or ignoring other bids. There is also the possibility of a malicious bidder or a block producer trying to _grief_ honest bidders by sniping auctions.

For this reason, [Vickrey auctions](https://en.wikipedia.org/wiki/Vickrey_auction), a variant of second price auction in which bids are hidden and only revealed in a later phase, have emerged as a well-regarded mechanic. For example, it is implemented as the mechanism to auction human readable names on the [ENS](ens). The Candle auction is another solution that does not need the two-step commit and reveal schemes (a main component of Vickrey auctions), and for this reason allows smart contracts to participate.

Candle auctions allow everyone to always know the states of the bid, but not when the auction will be determined to have ended. This helps to ensure that bidders are willing to bid their true bids early. Otherwise, they might find themselves in the situation that the auction was determined to have ended before they even bid.

## AXIA Implementation

AXIA will use a _random beacon_ based on the VRF that's used also in other places of the protocol. The VRF will provide the base of the randomness, which will retroactively determine the end-time of the auction.

The slot durations are capped to 2 years and divided into 6-month periods. Allychains may lease a slot for any contiguous range of the slot duration. Allychains may lease more than one slot over time, meaning that they could extend their lease to AXIA past the 2 year slot duration simply by leasing a contiguous slot.

> Note: Individual allychain slots are fungible. This means that allychains do not need to always inhabit the same slot, but as long as a allychain inhabits any slot it can continue as a allychain.

## Bidding

Allychains, or allychain teams, can bid in the auction by specifying the slot range that they want to lease as well as the number of AXC they are willing to reserve. Bidders can be either ordinary accounts, or use the [crowdloan functionality](learn-crowdloans) to source AXC from the community.

```
创世的平行链插槽

       --6 months--
       v          v
Slot A |     1    |     2    |     3     |     4     |...
Slot B |     1    |     2    |     3     |     4     |...
Slot C |__________|     1    |     2     |     3     |     4     |...
Slot D |__________|     1    |     2     |     3     |     4     |...
Slot E |__________|__________|     1     |     2     |     3     |     4     |...
       ^                                             ^
       ---------------------2 years-------------------

1-4范围的每个周期代表6个月的持续时间，共2年
```

Each allychain slot has a maximum duration of 2 years, divided into 6-month periods. More than one continuous period is a range.

Bidders will submit a configuration of bids specifying the AXC amount they are willing to bond and for which ranges. The slot ranges may be any continuous range of the periods 1 - 4.

> Please note: If you bond tokens with a allychain slot, you cannot stake with those tokens. In this way, you pay for the allychain slot by forfeiting the opportunity to earn staking rewards.

A bidder configuration for a single bidder may look like the following pseudocode example:

```js
const bids = [
  {
    range: [1, 2, 3, 4],
    bond_amount: 300, // AXC
  },
  {
    range: [1, 2],
    bond_amount: 777, // AXC
  },
  {
    range: [2, 3, 4],
    bond_amount: 450, // AXC
  },
];
```

The important concept to understand from this example is that bidders may submit different configurations at different prices (`bond_amount`). However, only one of these bids would be eligible to win exclusive of the others.

The winner selection algorithm will pick bids that may be non-overlapping in order to maximize the amount of AXC held over the entire 2-year lease duration of the allychain slot. This means that the highest bidder for any given slot lease period might not always win (see the [example below](#examples)).

A random number, which is based on the VRF used by AXIA, is determined at each block. Additionally, each auction will have a threshold that starts at 0 and increases to 1. The random number produced by the VRF is examined next to the threshold to determine if that block is the end of the auction. Additionally, the VRF will pick a block from the last epoch to take the state of bids from (to mitigate some types of attacks from malicious validators).

### 例子

There is one allychain slot available.

Charlie bids `75 AXC` for the range 1 - 4.

Dave bids `100 AXC` for the range 3 - 4.

Emily bids `40 AXC` for the range 1 - 2.

Let's calculate each bidder's valuation according to the algorithm. We do this by multiplying the bond amount by the number of periods in the specified range of the bid.

Charlie - 75 \* 4 = 300 for range 1 - 4

Dave - 100 \* 2 = 200 for range 3 - 4

Emily - 40 \* 2 = 80 for range 1 - 2

Although Dave had the highest bid in accordance to AXC amount, when we do the calculations we see that since he only bid for a range of 2, he would need to share the slot with Emily who bid much less. Together Dave's and Emily's bids only equal a valuation of `280`.

Charlie's valuation for the entire range is `300` therefore Charlie is awarded the complete range of the allychain slot.

## 常见问题

### 为什么每个人不竞标最大长度？

For the duration of the slot the AXC bid in the auction will be locked up. This means that there are opportunity costs from the possibility of using those AXC for something else. For allychains that are beneficial to AXIA, this should align the interests between allychains and the AXIA Relay Chain.

### 这种机制如何帮助确保平行链的多样性？

The method for dividing the allychain slots into six month intervals was partly inspired by the desire to allow for a greater amount of allychain diversity, and prevent particularly large and well-funded allychains from hoarding slots. By making each period a six-month duration but the overall slot a 2-year duration, the mechanism can cope with well-funded allychains that will ensure they secure a slot at the end of their lease, while gradually allowing other allychains to enter the ecosystem to occupy the six-month durations that are not filled. For example, if a large, well-funded allychain has already acquired a slot for range 1 - 4, they would be very interested in getting the next slot that would open for 2 - 5. Under this mechanism that allychain could acquire period 5 (since that is the only one it needs) and allow range 2 - 4 of the second allychain slot to be occupied by another.

### 为什么在区块链上很难实现随机性？

Randomness is problematic for blockchain systems. Generating a random number trustlessly on a transparent and open network in which other parties must be able to verify opens the possibility for actors to attempt to alter or manipulate the randomness. There have been a few solutions that have been put forward, including hash-onions like [RANDAO](https://github.com/randao/randao) and [verifiable random functions](https://en.wikipedia.org/wiki/Verifiable_random_function) (VRFs). The latter is what AXIA uses as a base for its randomness.

### Are there other ways of acquiring a slot besides the candle auction?

The only other way besides the candle auction to acquire a allychain slot is through a secondary market where an actor who has already won a allychain slot can resell the slot along with the associated deposit of AXC that is locked up to another buyer. This would allow the seller to get liquid AXC in exchange for the allychain slot and the buyer to acquire the slot as well as the deposited AXC.

A number of system-level allychains may be granted slots by the [governing bodies](learn-governance) of the Relay Chain. Such allychains would not have to bid for or renew their slots as they would be considered essential to the ecosystem's future.

## 资源

- [Allychain Allocation](https://research.AXIA.org/en/latest/AXIA/economics/2-allychain-allocation.html) - W3F research page on allychain allocation that goes more in depth to the mechanism.
