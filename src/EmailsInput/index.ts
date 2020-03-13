const InputComponentClass = require("./InputComponent");
const TagsClass = require("./Tags");

class EmailsInputClass {
  readonly id: string;
  readonly element: HTMLElement | null;
  private inputComponent: InputComponent;
  private tagsHanlder: Tags;
  private emails: string[] = [];
  private onChangeCallback: (emails: string[]) => void = () => {};

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
      this.onChangeCallback(this.emails);
    } else if (!this.emails.includes(value)) {
      this.emails.push(value);
      this.tagsHanlder.add(value);
      this.onChangeCallback(this.emails);
    }
  }

  private onEmailRemoveHandler(): void {
    this.tagsHanlder.removeLast();
    this.emails.pop();
    this.onChangeCallback(this.emails);
  }

  private onEmailRemoveIndexHandler(value: string): void {
    this.emails = this.emails.filter(email => email !== value);
    this.onChangeCallback(this.emails);
  }

  public addRandomEmails(): void {
    ["ivan@mail.ru", "max@mail.ru"].forEach(value => {
      if(!this.emails.includes(value)) {
        this.emails.push(value);
        this.tagsHanlder.add(value);
      }
    });
    this.onChangeCallback(this.emails);
  }

  public getEmailsCount(): void {
    alert(this.emails.length);
  }

  public getEmails(): string[] {
    return this.emails;
  }

  public replaceEmails(emails: string[]): void {
    this.tagsHanlder.removeAll();
    this.emails = [];
    emails.forEach(value => {
      this.emails.push(value);
      this.tagsHanlder.add(value);
    });
    this.onChangeCallback(this.emails);
  }

  public onChange(callback: (emails: string[]) => void): void {
    this.onChangeCallback = callback;
  }

}

module.exports = EmailsInputClass;
