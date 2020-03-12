class InputComponent {
  readonly id: string;
  private parentElement: HTMLElement;
  readonly input: HTMLInputElement;
  private value: string = "";
  onSubmitCallback: (value: string) => void;
  onRemoveCallback: () => void;

  constructor(
    parentId: string,
    parentElement: HTMLElement,
    onSubmitCallback: (value: string) => void,
    onRemoveCallback: () => void
  ) {
    this.onInput = this.onInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.id = `emails-input__text-area-${parentId}`;
    this.parentElement = parentElement;
    this.onSubmitCallback = onSubmitCallback;
    this.onRemoveCallback = onRemoveCallback;

    this.input = document.createElement("INPUT") as HTMLInputElement;
    this.input.setAttribute("type", "text");
    this.input.setAttribute("size", "");
    this.input.setAttribute("placeholder", "Insert your tag");
    this.input.className = "emails-input__text-input";

    this.input.addEventListener("input", this.onInput, false);
    this.input.addEventListener("keydown", this.onKeyDown, false);
    this.input.addEventListener("blur", this.onBlur, false);

    this.parentElement.appendChild(this.input);
  }

  private onInput(e: Event): void {
    if (e.target instanceof HTMLInputElement) {
      this.value = e.target.value;
      this.input.setAttribute("size", `${this.value.length}`);
    }
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (e.target instanceof HTMLInputElement) {
      if (['Enter', ','].includes(e.key)) {
        e.preventDefault();
        if(this.value.length) {
          this.submit();
        }
      }
      if (e.key === "Backspace" && !this.value.length) {
        this.onRemoveCallback();
      }
    }
  }

  private onBlur(e: Event): void {
    if(this.value.length) {
      this.submit();
    }
  }

  private submit() {
    this.onSubmitCallback(this.value);
    this.input.value = "";
    this.value = "";
    this.input.setAttribute("size", "");
  }
}

class TagsContainer {
  private parentElement: HTMLElement;
  private container: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.container = document.createElement("DIV") as HTMLDivElement;
    this.container.className = "emails-input__tags";

    this.parentElement.appendChild(this.container);
  }

  public add(value: string) {
    const tagElement = document.createElement("SPAN") as HTMLSpanElement;
    tagElement.className = "emails-input__tag";
    tagElement.innerText = value;

    const tags = this.parentElement.getElementsByClassName("emails-input__tag");
    const lastTag = tags[tags.length - 1];

    if (!!lastTag) {
      lastTag.parentNode?.insertBefore(tagElement, lastTag.nextSibling);
    } else {
      this.parentElement.prepend(tagElement);
    }
  }

  public removeLast() {
    const tags = this.parentElement.getElementsByClassName("emails-input__tag");
    const lastTag = tags[tags.length - 1];
    if (!!lastTag) {
      this.parentElement.removeChild(lastTag);
    }
  }
}

class EmailsInputClass {
  readonly id: string;
  readonly element: HTMLElement | null;
  private inputComponent: InputComponent;
  private tagsContainer: TagsContainer;

  constructor(id: string) {
    this.onEmailSubmitHandler = this.onEmailSubmitHandler.bind(this);
    this.onEmailRemoveHandler = this.onEmailRemoveHandler.bind(this);
    this.id = id;
    this.element = document.getElementById(id);

    if (!!this.element) {
      // append tag container
      this.tagsContainer = new TagsContainer(this.element);
      // append the input html element
      this.inputComponent = new InputComponent(
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
    this.tagsContainer.add(value);
  }

  onEmailRemoveHandler() {
    this.tagsContainer.removeLast();
  }
}

module.exports = EmailsInputClass;
