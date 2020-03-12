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
    this.id = id;
    this.element = document.getElementById(id);

    if (!!this.element) {
      // append tag container
      this.tagsHanlder = new TagsClass(this.element);
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

  private onEmailSubmitHandler(value: string) {
    if (value.includes(",")) {
      value.split(",").forEach(value => {
        const trimmed = value.trim();
        if(trimmed.length) {
          this.tagsHanlder.add(trimmed);
          this.emails.push(trimmed);
        }
      });
    } else {
      this.tagsHanlder.add(value);
      this.emails.push(value);
    }
  }

  private onEmailRemoveHandler() {
    this.tagsHanlder.removeLast();
    this.emails.pop();
  }

  public addRandomEmails() {
    ['ivan@mail.ru', 'max@mail.ru'].forEach(value => {
      this.tagsHanlder.add(value);
      this.emails.push(value);
    });
  }

  public getEmailsCount() {
    alert(this.emails.length);
  }
}

module.exports = EmailsInputClass;
