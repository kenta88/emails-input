const InputComponentClass = require("./InputComponent");
const TagsClass = require("./Tags");

class EmailsInputClass {
  readonly id: string;
  readonly element: HTMLElement | null;
  private inputComponent: InputComponent;
  private tagsHanlder: Tags;
  private emails: string[] = [];

  constructor(id: string) {
    this.onEmailSubmitHandler = this.onEmailSubmitHandler.bind(this);
    this.onEmailRemoveHandler = this.onEmailRemoveHandler.bind(this);
    this.onEmailRemoveIndexHandler = this.onEmailRemoveIndexHandler.bind(this);

    this.id = id;
    this.element = document.getElementById(id);

    if (!!this.element) {
      this.tagsHanlder = new TagsClass(
        this.element,
        this.onEmailRemoveIndexHandler
      );
      // append the input html element
      this.inputComponent = new InputComponentClass(
        this.id,
        this.element,
        this.onEmailSubmitHandler,
        this.onEmailRemoveHandler
      );
    } else {
      throw "parentElement not found!";
    }
  }

  private onEmailSubmitHandler(value: string): void {
    if (value.includes(",")) {
      value.split(",").forEach(value => {
        const trimmed = value.trim();
        if (trimmed.length && !this.emails.includes(trimmed)) {
          this.emails.push(trimmed);
          this.tagsHanlder.add(trimmed);
        }
      });
    } else if (!this.emails.includes(value)) {
      this.emails.push(value);
      this.tagsHanlder.add(value);
    }
  }

  private onEmailRemoveHandler(): void {
    this.tagsHanlder.removeLast();
    this.emails.pop();
  }

  private onEmailRemoveIndexHandler(value: string): void {
    this.emails = this.emails.filter(email => email !== value);
  }

  public addRandomEmails(): void {
    ["ivan@mail.ru", "max@mail.ru"].forEach(value => {
      this.emails.push(value);
      this.tagsHanlder.add(value);
    });
  }

  public getEmailsCount(): void {
    alert(this.emails.length);
  }
}

module.exports = EmailsInputClass;
