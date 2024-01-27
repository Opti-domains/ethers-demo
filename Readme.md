# Opti.domains ethers.js integration demo

Demo interacting with Opti.domains with ethers.js

Get started by installing tsx and dependencies.

```bash
npm install -g tsx
yarn install
```

And run `index.ts` to launch an Opti.domains ethers.js integration demo.

```bash
tsx index.ts
```

An interactive shell will start asking for chain, domain name to resolve, and address for reverse resolution.

```
==== Welcome to Opti.domains ethers.js integration demo ====
? Enter a chain [optimism/base]: base
? Enter an Opti.domains domain to resolve (e.g., chomtana.town): chomtana.town
Address for chomtana.town is: 0xf01Dd015Bc442d872275A79b9caE84A6ff9B2A27
? Enter the Ethereum address for reverse resolution: 0xf01Dd015Bc442d872275A79b9caE84A6ff9B2A27
Opti.domains for address 0xf01Dd015Bc442d872275A79b9caE84A6ff9B2A27 is: chomtana.town
```