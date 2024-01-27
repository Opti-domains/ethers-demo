import { ethers } from 'ethers';
import inquirer from 'inquirer';

async function resolveDomain(provider: ethers.Provider, domain: string): Promise<string | null> {
  try {
      const address = await provider.resolveName(domain);
      return address;
  } catch (error) {
      console.error('Error resolving domain:', error);
      return null;
  }
}

async function lookupAddress(provider: ethers.Provider, address: string): Promise<string | null> {
  try {
      const name = await provider.lookupAddress(address);
      return name;
  } catch (error) {
      console.error('Error looking up address:', error);
      return null;
  }
}

async function main() {
  console.log('==== Welcome to Opti.domains ethers.js integration demo ====')

  // Prompt for chain
  const chainResponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'chain',
      message: 'Enter a chain [optimism/base]:'
    }
  ]);

  if (chainResponse.chain != 'optimism' && chainResponse.chain != 'base') {
    console.error('Please enter optimism or base')
    return;
  }

  const chainId = chainResponse.chain == 'optimism' ? 10 : 8453
  const chainName = chainResponse.chain == 'optimism' ? 'Optimism' : 'Base'
  const rpc = chainResponse.chain == 'optimism' ? 'https://mainnet.optimism.io' : 'https://mainnet.base.org'

  const provider = new ethers.JsonRpcProvider(rpc, {
    name: chainName,
    chainId: chainId,
    ensAddress: "0x888811b3DFC94566Fc8F6aC5e86069981a50B490",
    ensNetwork: chainId,
  })

  // Prompt for domain name
  const domainResponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'domain',
      message: 'Enter an Opti.domains domain to resolve (e.g., chomtana.town):'
    }
  ]);

  // Example domain to resolve
  const domain = domainResponse.domain;
  const resolvedAddress = await resolveDomain(provider, domain);
  console.log(`Address for ${domain} is:`, resolvedAddress);

  // Prompt for address
  const addressResponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'address',
      message: 'Enter the Ethereum address for reverse resolution:'
    }
  ]);

  // Example address for reverse resolution
  const address = addressResponse.address;
  const resolvedDomain = await lookupAddress(provider, address);
  console.log(`Opti.domains for address ${address} is:`, resolvedDomain);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  });