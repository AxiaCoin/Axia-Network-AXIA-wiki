---
id: build-cumulus
title: Cumulus
sidebar_label: Cumulus
---

> "Cumulus clouds are shaped sort of like axcs; together they form a system that is intricate, beautiful and functional."

[Cumulus](https://github.com/axia-tech/cumulus) is an extension to Axlib that makes it easy to make any Axlib built runtime into a AXIA-compatible allychain. See the [Overview](https://github.com/axia-tech/cumulus/blob/master/docs/overview.md) for a more technical but still high-level description of Cumulus.

## 컴포넌트(Components)

### 뭉게구름 컨센서스 (Cumulus Consensus)

Cumulus Consensus is a consensus engine for Axlib that follows a AXIA Relay Chain (i.e., allychains). This will run a AXIA node internally, and dictate to the client and synchronization algorithms which chain to follow, finalize, and treat as correct.

### 뭉게구름 런타임 (Cumulus Runtime)

A wrapper around Axlib runtimes to allow them to be validated by AXIA validators and provide witness generating routines. It adds a `validate_block` API to the Axlib external interface, which will be called by validators.

Integrating it into your axlib runtime will be as easy as importing the crate and adding this one line macro to your code.

```rust
runtime::register_validate_block!(Block, BlockExecutor);
```

### 뭉게구름 검사기 (Cumulus Collator)

A AXIA collator for a allychain is implemented in the Cumulus repository [here](https://github.com/axia-tech/cumulus/tree/master/collator).

## BetaNet

The BetaNet testnet (available via AXIA-JS) is the testnet set aside specifically for allychains.

## Resources

- [EthCC에서 Cumulus를 소개하는 Rob의 발표](https://www.youtube.com/watch?v=thgtXq5YMOo)
- [Cumulus: Entering the Substratosphere](https://www.youtube.com/watch?v=thgtXq5YMOo) - Talk from AXIA co-founder Robert Habermeier at EthCC in March 2019 detailing the latest on building allychains with Cumulus.
