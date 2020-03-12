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
    this.input.setAttribute("placeholder", "add more people...");
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
      if (["Enter", ","].includes(e.key)) {
        e.preventDefault();
        if (this.value.length) {
          this.submit();
        }
      }
      if (e.key === "Backspace" && !this.value.length) {
        this.onRemoveCallback();
      }
    }
  }

  private onBlur(e: Event): void {
    if (this.value.length) {
      this.submit();
    }
  }

  private submit() {
    this.onSubmitCallback(this.value.trim());
    this.input.value = "";
    this.value = "";
    this.input.setAttribute("size", "");
  }
}

module.exports = InputComponent;
