module.exports = {
  docs: [
    {
      type: "category",
      label: "Introduction",
      items: [
        "general/AXIAOverview",
        "general/AXIATestNet",
        //"general/getting-started",
        //"general/claims",
        //"general/redenomination",
        //{
          //   type: "category",
            // label: "Why AXIA?",
             //items:[            

            //"general/grants",
            //"general/ambassadors",
            //"general/community",
          //  "general/contributing",
            //"general/contributors",
            //"general/glossary",
            //"general/ens",
            //"general/ledger",
            //"general/research",
//]},
         
         // "general/scams",
        //"general/how-to-dyor",
        //"general/doc-thousand-validators",
        //"general/faq",
      ],
    },
    {
      type: "category",
      label: "Discover",
      items: [
        //"learn/learn-architecture",
        {
          type: "category",
          label: "Getting Started",
          items: [
            "learn/The-AXIA-Network",
            "learn/The-AXIA-Economy",
            "learn/The-AXIA-Treasury",
            //"learn/AXIA-Coin-(AXC)",
            "learn/learn-auction",
            "learn/AXIA-Foundation",

            //"learn/learn-architecture",
            //"learn/learn-accounts",
            //"learn/learn-account-generation",
            //"learn/learn-account-restore",
            //"learn/learn-AXC",
            //"learn/learn-security",
            //,
            //"learn/learn-nominator",
            
            //"learn/learn-validator",
            //"learn/learn-collator",
            //"learn/learn-governance",
            //"learn/learn-identity",
            //"learn/learn-balance-transfers",
            //"learn/learn-transaction-fees",
            //"learn/learn-AXIA-host",
            //"learn/learn-treasury",
            //"learn/learn-registrar",
            //"learn/learn-runtime-upgrades",
          ],
        },
        
        {
          type: "category",
          label: "Advanced",
          items: [
            "learn/The-AXIA-Ecosystem",
            "learn/AXIA-DeFi",
            "learn/AXIA-Services",
            "learn/AXIA-Applications",
            "learn/AXIA-Staking",
            "learn/learn-consensus",
            //"learn/learn-cross-consensus",
            //"learn/Coin-Supply-and-Management",
            //"learn/TransactionFees",
            //"learn/Transaction-Fees",
            //"learn/learn-staking",
            //"learn/learn-proxies",
            //"learn/learn-availability",
            //"learn/learn-randomness",
            //
            //{
            // type: "category",
             //label: "Benefits",
            // items:[            

           // "learn/learn-spree",
            //"learn/learn-wasm",
            //"learn/learn-phragmen",
            //"learn/learn-simple-payouts",]}
          ],
        },
        {
          type: "category",
          label: "Cryptography",
          items: ["learn/learn-cryptography", "learn/learn-keys"],
        },
        {
          type: "category",
          label: "Allychains",
          items: [
            "learn/learn-allychains",
            //"learn/learn-parathreads",
            "learn/learn-bridges",
            "learn/learn-common-goods",
            //"learn/learn-auction",
            //"learn/learn-crowdloans",
            //"learn/learn-teleport",
          ],
        },
       /* {
          type: "category",
          label: "AXIA Comparisons",
          items: [
            "learn/learn-comparisons-ethereum-2",
            "learn/learn-comparisons-cosmos",
            "learn/learn-comparisons",
          ],
        },*/
      ],
    },
    {
      type: "category",
      label: "Develop",
      items: [
            "build/build-index",
            "build/build-pdk",
            "build/build-transaction-construction",
            "build/build-guide",
            //"learn/learn-implementers-guide",
            
            
            {
            type: "category",
            label: "AXwallet",
            items:[
            //TO DO
                "build/build-storage",
                "build/build-node-interaction","build/build-protocol-info",
                ],
},
           "build/build-smart-contracts",
            
               {
                type: "category",
                label: "AXscan ",
                items: [
 "build/build-oracle",
//"build/build-node-management",
            "build/build-integration",
                "build/build-integrate-assets",
            
],
},
            //"build/build-ss58-registry",
            //"build/build-wallets",
             ],
    },
        //
        //{
         // type: "category",
         // label: "Development Guide",
        //  items: [
          //  "build/build-guide",
         //   "learn/learn-implementers-guide",
         //   "build/build-allychains",
        //    "build/build-storage",
          //  "build/build-smart-contracts",
           // "build/build-oracle",
           // "build/build-ss58-registry",
           // "build/build-wallets",
        //  ],
      //  },
        //{
          //type: "category",
         // label: "Integration Guide",
          //items: [
           // 
           // 
           // 
           // 
           // 
         // ],
      //  },
       // {
        //  type: "category",
       //   label: "Tools",
       //   items: ["build/build-tools-index"],
       // },
     
    /*{
      type: "category",
      label: "Maintain",
      items: [
        "maintain/maintain-index",
        "maintain/maintain-AXIA-parameters",
        {
          type: "category",
          label: "Nodes and Dapps",
          items: [
            "maintain/maintain-sync",
            "maintain/maintain-networks",
            "maintain/maintain-wss",
            "maintain/maintain-errors",
          ],
        },
        {
          type: "category",
          label: "Nominator Guides",
          items: [
            "maintain/maintain-guides-how-to-nominate-AXIA",
            "maintain/maintain-guides-how-to-unbond",
          ],
        },
        {
          type: "category",
          label: "Validator Guides",
          items: [
            "maintain/maintain-guides-how-to-validate-AXIA",
            "maintain/maintain-guides-validator-payout",
            "maintain/maintain-guides-how-to-systemd",
            "maintain/maintain-guides-secure-validator",
            "maintain/maintain-guides-how-to-use-AXIA-validator-setup",
            "maintain/maintain-guides-how-to-setup-a-validator-with-reverse-proxy",
            "maintain/maintain-guides-how-to-upgrade",
            "maintain/maintain-guides-how-to-monitor-your-node",
            "maintain/maintain-guides-how-to-chill",
            "maintain/maintain-guides-how-to-stop-validating",
            "maintain/doc-maintain-guides-validator-community",
          ],
        },
        {
          type: "category",
          label: "Governance Guides",
          items: [
            "maintain/maintain-guides-democracy",
            "maintain/maintain-guides-how-to-join-council",
            "maintain/maintain-guides-how-to-vote-councillor",
          ],
        },
      ],
    },*/
  ],
};
