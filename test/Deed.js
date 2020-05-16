const Deed = artifacts.require('Deed');

contract('Deed', (accounts) => {
	let deed = null;
	before(async () => {
		deed = await Deed.deployed();
	});

	it('Should withdraw ether', async () => {
		const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
		await new Promise(resolve => setTimeout(resolve, 5000));
		await deed.withdraw({from: accounts[0]});
		const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
		assert(finalBalance.sub(initialBalance).toNumber() === 1000);
	});

	it('Should not withdraw too early', async () => {
		const deed = await Deed.new(accounts[0], accounts[1], 5, {value: 1000});
		try {
			await deed.withdraw({from: accounts[0]});
		} catch (e){
			assert(e.message.includes('too early to make call'));
			return;
		}
		assert(false);
	});

	it('Should not withdraw if caller is not lowyer', async () => {
		const deed = await Deed.new(accounts[0], accounts[1], 5, {value: 1000});
		try {
			await new Promise(resolve => setTimeout(resolve, 5000));
			await deed.withdraw({from: accounts[7]});
		} catch (e){
			assert(e.message.includes('only lawyer can call this'));
			return;
		} 
		assert(false);
	});
});

