const safemath = artifacts.require("./safemath.sol")
module.exports = function(deployer) {
	deployer.deploy(safemath);
};
const land_registration = artifacts.require("./land_registration.sol")
module.exports = function(deployer) {
	deployer.deploy(land_registration);
};

const erc20_tokens = artifacts.require("./ERC20Interface")
module.exports = function(deployer) {
	deployer.deploy(erc20_tokens);
};

const land_transactions = artifacts.require("./land_transactions.sol")
module.exports = function(deployer) {
	deployer.deploy(land_transactions);
};



