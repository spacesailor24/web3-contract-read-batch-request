import { Contract } from 'web3';

import { ERC20TokenAbi } from './ERC20Token';

const mainnetUSDTAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';

(async () => {
	const erc20ContractDeployed = new Contract(ERC20TokenAbi, mainnetUSDTAddress, {
		provider: 'https://yourProvider.com',
	});

	const request1 = {
		id: 1,
		method: 'eth_call',
		params: [
			{
				to: mainnetUSDTAddress,
				data: erc20ContractDeployed.methods.name().encodeABI(),
			},
			'latest',
		],
	};
	const request2 = {
		id: 2,
		method: 'eth_call',
		params: [
			{
				to: mainnetUSDTAddress,
				data: erc20ContractDeployed.methods.symbol().encodeABI(),
			},
			'latest',
		],
	};
	const request3 = {
		id: 3,
		method: 'eth_call',
		params: [
			{
				to: mainnetUSDTAddress,
				data: erc20ContractDeployed.methods.totalSupply().encodeABI(),
			},
			'latest',
		],
	};

	const batchRequester = new erc20ContractDeployed.BatchRequest();
	batchRequester.add(request1);
	batchRequester.add(request2);
	batchRequester.add(request3);

	const response = await batchRequester.execute();
	console.log(response);
})();
