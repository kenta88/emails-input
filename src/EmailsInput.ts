class EmailsInputClass {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  greet() {
    console.log("Hello, " + this.id);
  }
}

module.exports = EmailsInputClass;
