const MyContract = artifacts.require("DStorage");

module.exports = function (deployer) {
    deployer.deploy(MyContract);
};