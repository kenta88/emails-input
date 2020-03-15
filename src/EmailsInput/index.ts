const InputComponentClass = require("./InputComponent");
const TagsClass = require("./Tags");

interface EmailObj {
  id: string;
  email: string;
}

class EmailsInputClass {
  readonly id: string;
  readonly element: HTMLElement | null;
  private inputComponent: InputComponent;
  private tagsHanlder: Tags;
  private emails: EmailObj[] = [];
  private onChangeCallback: (emails: string[]) => void = () => {};

  constructor(id: string) {
    this.onEmailSubmitHandler = this.onEmailSubmitHandler.bind(this);
    this.onEmailRemoveHandler = this.onEmailRemoveHandler.bind(this);
    this.onEmailRemoveIndexHandler = this.onEmailRemoveIndexHandler.bind(this);

    this.id = id;
    this.element = document.getElementById(id);

    if (!!this.element) {
      this.element.addEventListener("click", () => {
        this.inputComponent.input.focus();
      }, false);

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

  private createEmailObject(email: string): EmailObj {
    const trimmed = email.trim();
    const emailObj = {
      id: `${Date.now()}`,
      email: trimmed
    };
    return emailObj;
  }

  private addEmail(email: string): void {
    const emailObj = this.createEmailObject(email);
    this.emails.push(emailObj);
    this.tagsHanlder.add(emailObj);
  }

  private onEmailSubmitHandler(value: string): void {
    if (value.includes(",")) {
      value.split(",").forEach(value => {
        const trimmed = value.trim();
        if (trimmed.length) {
          this.addEmail(trimmed);
        }
      });
    } else {
      this.addEmail(value);
    }
    this.onChangeHandler();
  }

  private onEmailRemoveHandler(): void {
    this.tagsHanlder.removeLast();
    this.emails.pop();
    this.onChangeHandler();
  }

  private onEmailRemoveIndexHandler(emailId: string): void {
    this.emails = this.emails.filter(email => email.id !== emailId);
    this.onChangeHandler();
  }

  private onChangeHandler = () => {
    this.onChangeCallback(this.getEmails());
  };

  public addRandomEmails(): void {
    ["ivan@mail.ru", "max@mail.ru"].forEach(value => {
      this.addEmail(value);
    });
    this.onChangeHandler();
  }

  public getEmailsCount(): void {
    alert(this.emails.length);
  }

  public getEmails(): string[] {
    return this.emails.map((emailObj: EmailObj) => emailObj.email);
  }

  public replaceEmails(emails: string[]): void {
    this.tagsHanlder.removeAll();
    this.emails = [];
    emails.forEach(value => {
      this.addEmail(value);
    });
    this.onChangeHandler();
  }

  public onChange(callback: (emails: string[]) => void): void {
    this.onChangeCallback = callback;
  }
}

module.exports = EmailsInputClass;
