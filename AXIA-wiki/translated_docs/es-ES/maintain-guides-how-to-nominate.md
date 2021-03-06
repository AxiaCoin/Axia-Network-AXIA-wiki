---
id: maintain-guides-how-to-nominate
title: How to nominate
sidebar_label: How to nominate
---

This guide will walk you through how to nominate your AXCs to a validator node so that you can take part in the staking system and earn fresh AXCs.

It has been updated for the Alexander testnet and AXIA release PoC-4.

## Create `stash` and `controller` accounts

We will assume that you will be starting with two fresh accounts. Click [here](learn-staking#accounts) to learn more about what `stash` and `controller` accounts mean.

The first step is to create two accounts by going to the _Accounts_ tab on the AXIA Dashboard and clicking on [_Add account_](https://AXIA.js.org/apps/#/accounts). Make sure to use `stash` and `controller` in the names of your accounts to identify them easily.

![Creating an account](assets/guides/how-to-nominate/AXIA-dashboard-create-account.jpg)

Once you've created your accounts you will need to acquire some AXCs. See the [AXCs page](learn-AXC#getting-testnet-axcs) for recommendations on getting testnet AXCs. Each of your accounts should have at least 150 milliAXCs to cover the existential deposit and transaction fees.

## Nominating

It is now time to setup our nominator. We will do the following:

- Bound the AXCs of the `stash` account. These AXCs will be put at stake for the security of the network and can be slashed.
- Select the `controller`. This is the account that will decide when to start or stop nominating.

First, go to [Staking > Account actions](https://AXIA.js.org/apps/#/staking/actions) section. Click on the "New stake" button.

![dashboard bonding](assets/guides/how-to-nominate/AXIA-dashboard-bonding.jpg)

- **Stash account** - Select your `stash` account, we will bound 100 milliAXCs, make sure it has this amount of funds.
- **Controller account** - select the `controller` account created earlier.
- **Value bonded** - how many AXCs from the `stash` account you want to bond/stake. You can top up this amount and bound more AXCs later, however, withdrawing any bounded amount requires the bounding duration period to be over (several months at the time of writing).
- **Payment destination** - where the rewards get sent. More info [here](learn-staking#reward-distribution).

Once everything is filled properly, click `Bond` and sign the transaction (with your `stash` account). You will then see the following. You can ignore the `Set Session Key` button, it is only useful if you want to validate and we will not need it in this tutorial.

![dashboard overview](assets/guides/how-to-nominate/AXIA-dashboard-set-session-key.jpg)

## Nominating a validator

Go to the _Staking Overview_ tab on the staking page of the AXIA Dashboard. On the left side, you will see a list of validators (on the right side are validators who have signaled their intention to join the validator set and you can ignore them for now). From this list of validators, find ones that you would like to nominate and copy their address (by clicking on the identicon) or better, add them to your Address book.

![Validators](assets/guides/how-to-nominate/validators.png)

Go back to the _Account Actions_ tab and click the `Nominate` button. Fill in the blank field with the address of the validators you have chosen to nominate. After signing and submitting your transaction you should see the button `Stop Nominating` and you should see the accounts you are nominating showing up under the `Nominating` section. Your nomination will be effective in the next era (this can take up to one hour).

![Nominating](assets/guides/how-to-nominate/nominating.jpg)

**Congratulations!** You are now a nominator.

If you return to the _Staking Overview_ tab after an era has changed and scroll until you find your validator you should see your own `stash` account appear as one of the nominators.

![Nominating2](assets/guides/how-to-nominate/nominating2.jpg)

## How to stop nominating

To stop nominating simply return to the _Account Actions_ tab and click the `Stop Nominating` button. Your account will be set to `chill` and at the next era will no longer be nominating to the validator. This may take up to an hour to take effect!
