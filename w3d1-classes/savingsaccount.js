class SavingsAccount extends Account {
  constructor(number, interest) {
    super(number);
    this._interest = interest;
  }
  setInterest(interest) {
    this._interest = interest;
  }
  getInterest() {
    return this._interest;
  }
  addInterest() {
    this.deposit(this.getBalance() * (this.getInterest() / 100));
  }
  toString() {
    return `Savings Account Number:${this.getNumber()}, Balance:${this.getBalance()} interest:${
      this._interest
    }`;
  }
  endOfMonth() {
    let prev = this.getBalance();
    this.addInterest();
    return `Interest added ${this.getBalance() - prev} ${this.toString()}`;
  }
}
