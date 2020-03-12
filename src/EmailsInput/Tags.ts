const RemoveIcon = require("../assets/remove.svg");

const validEmailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Tags {
  private parentElement: HTMLElement;
  private index = 0;
  onRemoveCallback: (value: string) => void;

  constructor(
    parentElement: HTMLElement,
    onRemoveCallback: (value: string) => void
  ) {
    this.parentElement = parentElement;
    this.onRemoveCallback = onRemoveCallback;
    this.onRemove = this.onRemove.bind(this);
  }

  public add(value: string): void {
    const isEmailValid = validEmailRegexp.test(value);
    const tagElement = document.createElement("SPAN") as HTMLSpanElement;
    tagElement.setAttribute("data-email", value);
    tagElement.classList.add("emails-input__tag");

    if (!isEmailValid) {
      tagElement.classList.add("emails-input__tag--invalid");
    }

    const emailContainer = document.createElement("SPAN") as HTMLSpanElement;
    emailContainer.innerText = value;
    emailContainer.className = "emails-input__email-container";

    tagElement.append(emailContainer);

    const removeButton = document.createElement("BUTTON") as HTMLButtonElement;
    removeButton.setAttribute("data-email", value);
    removeButton.addEventListener("click", this.onRemove, false);

    const icon = document.createElement("IMG") as HTMLImageElement;
    icon.setAttribute("src", RemoveIcon.default);

    removeButton.append(icon);
    tagElement.append(removeButton);

    const tags = this.parentElement.getElementsByClassName("emails-input__tag");
    const lastTag = tags[tags.length - 1];

    if (!!lastTag) {
      lastTag.parentNode?.insertBefore(tagElement, lastTag.nextSibling);
    } else {
      this.parentElement.prepend(tagElement);
    }
    this.index++;
  }

  public removeLast(): void {
    const tags = this.parentElement.getElementsByClassName("emails-input__tag");
    const lastTag = tags[tags.length - 1];
    if (!!lastTag) {
      this.parentElement.removeChild(lastTag);
    }
  }

  private onRemove(e: MouseEvent): void {
    if (e.target instanceof HTMLButtonElement) {
      const email = e.target.dataset.email;
      if (!!email) {
        const span = this.parentElement.querySelectorAll(
          `span[data-email="${email}"]`
        )[0];
        this.parentElement.removeChild(span);
        this.onRemoveCallback(email);
      }
    }
  }
}

module.exports = Tags;
