const RemoveIcon = require("../assets/remove.svg");

const validEmailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Tags {
  private parentElement: HTMLElement;
  private index = 0;
  onRemoveCallback: (emailId: string) => void;

  constructor(
    parentElement: HTMLElement,
    onRemoveCallback: (emailId: string) => void
  ) {
    this.parentElement = parentElement;
    this.onRemoveCallback = onRemoveCallback;
    this.onRemove = this.onRemove.bind(this);
  }

  public add(emailObj: EmailObj): void {
    const isEmailValid = validEmailRegexp.test(emailObj.email);
    const tagElement = document.createElement("SPAN") as HTMLSpanElement;

    tagElement.addEventListener("click", (e: MouseEvent) => {
      e.stopPropagation();
    }, false);

    tagElement.setAttribute("data-id", emailObj.id);
    tagElement.classList.add("emails-input__tag");

    if (!isEmailValid) {
      tagElement.classList.add("emails-input__tag--invalid");
    }

    const emailContainer = document.createElement("SPAN") as HTMLSpanElement;
    emailContainer.innerText = emailObj.email;
    emailContainer.className = "emails-input__email-container";

    tagElement.appendChild(emailContainer);

    const removeButton = document.createElement("BUTTON") as HTMLButtonElement;
    removeButton.setAttribute("data-id", emailObj.id);
    removeButton.addEventListener("click", this.onRemove, false);

    const icon = document.createElement("IMG") as HTMLImageElement;
    icon.setAttribute("src", RemoveIcon.default);

    removeButton.appendChild(icon);
    tagElement.appendChild(removeButton);

    const tags = this.parentElement.getElementsByClassName("emails-input__tag");
    const lastTag = tags[tags.length - 1];

    if (!!lastTag) {
      lastTag.parentNode?.insertBefore(tagElement, lastTag.nextSibling);
    } else {
      this.parentElement.insertBefore(
        tagElement,
        this.parentElement.childNodes[0]
      );
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

  public removeAll(): void {
    const tags = this.parentElement.querySelectorAll(".emails-input__tag");
    tags.forEach(tag => this.parentElement.removeChild(tag));
  }

  private onRemove(e: MouseEvent): void {
    if (e.target instanceof HTMLButtonElement) {
      const emailId = e.target.dataset.id;
      if (!!emailId) {
        const span = this.parentElement.querySelectorAll(
          `span[data-id="${emailId}"]`
        )[0];
        this.parentElement.removeChild(span);
        this.onRemoveCallback(emailId);
      }
    }
  }
}

module.exports = Tags;
