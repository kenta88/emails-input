class EmailsInputClass {
  id: string;
  constructor(id: string) {
    this.id = id;
  }
  greet(): void {
    console.log("Hello, " + this.id);
  }
}

module.exports = EmailsInputClass;
