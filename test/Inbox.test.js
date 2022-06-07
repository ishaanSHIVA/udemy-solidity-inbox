// contract test code will go here
const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

// commmunication of web3 with eth network => provider
const web3 = new Web3(ganache.provider());

// abi and bytecode of contract
const { bytecode, interface } = require("../compile");

let accounts;
let inboxContract;
let messageSend = "love you";

beforeEach(async () => {
  // get a list of all acounts

  accounts = await web3.eth.getAccounts();

  // use one of the acc for contract creation

  //   make a contract
  inboxContract = await new web3.eth.Contract(JSON.parse(interface))
    //   deploy the contract with this configuration
    .deploy({ data: bytecode, arguments: [messageSend] })
    // send the contract creation transaction with first account and 1 million gas limit
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploy a contract", () => {
    assert.ok(inboxContract.options.address);
  });
  it("has a default message", async () => {
    const message = await inboxContract.methods.message().call();
    // console.log(message);
    assert.equal(message, messageSend);
  });
  it("change message", async () => {
    const stringMessage = "yo";
    await inboxContract.methods
      .setMessage(stringMessage)
      .send({ from: accounts[0] });
    const message = await inboxContract.methods.message().call();
    assert.equal(message, stringMessage);
  });

  //   https://rinkeby.infura.io/v3/d10c1d8208ba4806877b7723f8016977
});
