class Tags {
  private parentElement: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
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

module.exports = Tags;
