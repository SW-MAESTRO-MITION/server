var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var contractAddress = "0x3389b56db41e764a578672ddb49ba3101ef81b5e";
var contractInfo = require("../../../../smart_contract/build/contracts/Contract.json");
var contractABI = contractInfo["abi"];

var contractObject = web3.eth.contract(contractABI);
var contractInstance = contractObject.at(contractAddress);

exports.addContract = function (req, res) {
    console.log(contractInstance.set("2017-11-27", {
        from: web3.eth.accounts[0]
    }));
    console.log(contractInstance.get());
};
