mocha.setup("bdd");
let assert = chai.assert;
describe("Account", function () {
  it("new Account must have zero balance", function () {
    assert.equal(new Account("12345").getBalance(), 0.0);
  });
});
describe("Deposit", function () {
  it("must throw error if negative value provided", function () {
    let acc = new Account("123");
    assert.throw(() => acc.deposit(-10), Error);
  });
  it("must add the right amount", function () {
    let acc = new Account("123");
    acc.deposit(10);
    assert.equal(acc.getBalance(), 10);
  });
});
describe("withdraw", function () {
  it("must throw error if negative value provided", function () {
    let acc = new Account("123");
    assert.throw(() => acc.withdraw(-10), Error);
  });
  it("must throw error if withdrawn amount is greater", function () {
    let acc = new Account("123");
    assert.throw(() => acc.withdraw(1), Error);
  });
});

describe("SavingsAccount", function () {
  it("must throw error if the balance is zero", function () {
    let acc = new SavingsAccount("1234", 50);
    assert.throw(() => acc.addInterest(), Error);
  });
  it("must add the right amount of interest", function () {
    let acc = new SavingsAccount("1234", 50);
    acc.deposit(100);
    acc.addInterest();
    assert.equal(acc.getBalance(), 150);
  });
});
describe("CheckingAccount", function () {
  it("must throw error if provided negative amount", function () {
    let acc = new CheckingAccount("100", 120);
    assert.throw(() => acc.withdraw(-10), Error);
  });
  it("must allow up to overdraft amount", function () {
    let acc = new CheckingAccount("120", 100);
    acc.withdraw(100);
    assert.equal(-100, acc.getBalance());
  });
  it("must throw error if withdrawal is below overDraft", function () {
    let acc = new CheckingAccount("100", 120);
    assert.throw(() => acc.withdraw(121), Error);
  });
});
describe("Bank", function () {
  it("must return empty array if nothing is added", function () {
    let bank = new Bank();
    assert.equal(0, bank.total());
  });
  it("must add and close account", function () {
    let bank = new Bank();
    bank.addAccount("123");
    assert.equal(1, bank.total());
    bank.closeAccount("123");
    assert.equal(0, bank.total());
  });
  it("must generate report", function () {
    let bank = new Bank();
    bank.addAccount("1");
    bank.addAccount("2");
    bank.addAccount("3");
    bank.addAccount("4");
    bank.addAccount("5");
    bank.addAccount("6");
    assert.equal("1\n2\n3\n4\n5\n6", bank.accountReport());
  });
});
describe("end of month", function () {
  it("normal account must return empty string", function () {
    let acc = new Account("123");
    assert.equal("", acc.endOfMonth());
  });
  it("checking account with negative balance must start with warning", function () {
    let acc = new CheckingAccount("123", 10);
    acc.withdraw(10);
    assert.equal(true, acc.endOfMonth().startsWith("Warning"));
  });
});
window.onload = function () {
  mocha.run();
};
