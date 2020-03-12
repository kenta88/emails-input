const InputComponentClass = require("./InputComponent");
const TagsClass = require("./Tags");

class EmailsInputClass {
  readonly id: string;
  readonly element: HTMLElement | null;
  private inputComponent: InputComponent;
  private tagsHanlder: Tags;

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

  onEmailSubmitHandler(value: string) {
    if (value.includes(",")) {
      value.split(",").forEach(value => {
        const trimmed = value.trim();
        if(trimmed.length) {
          this.tagsHanlder.add(trimmed);
        }
      });
    } else {
      this.tagsHanlder.add(value);
    }
  }

  onEmailRemoveHandler() {
    this.tagsHanlder.removeLast();
  }
}

module.exports = EmailsInputClass;
