const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "./test.html"), "utf8");

const EIClass = require("../index");

describe("EmailsInputClass", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  it("should render", () => {
    const aux = new EIClass("emails-input-1");
    expect(document.documentElement.innerHTML).toMatchSnapshot();
  });

  it("should throw an error if parentId is not provided", () => {
    try {
      const aux = new EIClass();
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBe("parentElement not found!");
    }
  });

  it("should throw an error if parentId is not found", () => {
    try {
      const aux = new EIClass("wrong-id");
      expect(true).toBe(false);
    } catch (e) {
      expect(e).toBe("parentElement not found!");
    }
  });

  it("should render the input element", () => {
    const aux = new EIClass("emails-input-1");
    const nodeList = document.querySelectorAll("#emails-input-1 input");
    expect(nodeList.length).toBe(1);
  });

  it("should return the email object", () => {
    const dateNowStub = jest.fn(() => 1530518207007);
    global.Date.now = dateNowStub;
    const emailInputConsumer = new EIClass("emails-input-1");
    const obj = emailInputConsumer.createEmailObject("fakeEmail@gmail.com");
    expect(obj).toEqual({
      id: "1530518207007",
      email: "fakeEmail@gmail.com"
    });
  });

  it("should add a new email and render the tag", () => {
    const dateNowStub = jest.fn(() => 1530518207007);
    global.Date.now = dateNowStub;
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.addEmail("fakeEmail@gmail.com");
    const tag = document.querySelectorAll(`span[data-id="1530518207007"]`);
    expect(emailInputConsumer.getEmails()).toEqual(["fakeEmail@gmail.com"]);
    expect(tag.length).toBe(1);
  });

  it("should add a new email when inputComponent call onSubmitCallback", () => {
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.inputComponent.onSubmitCallback("test@asd.com");
    expect(emailInputConsumer.getEmails()).toEqual(["test@asd.com"]);
  });

  it("should add multiple emails when inputComponent call onSubmitCallback with comma separated value", () => {
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.inputComponent.onSubmitCallback(
      "test@asd.com,test1@asd.com,test2@asd.com"
    );
    expect(emailInputConsumer.getEmails()).toEqual([
      "test@asd.com",
      "test1@asd.com",
      "test2@asd.com"
    ]);
  });

  it("should remove the last email when inputComponent call onRemoveCallback", () => {
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.emails = [
      {
        id: "1",
        email: "test1@asd.com"
      },
      {
        id: "2",
        email: "test2@asd.com"
      }
    ];

    emailInputConsumer.inputComponent.onRemoveCallback();
    expect(emailInputConsumer.getEmails()).toEqual(["test1@asd.com"]);
  });

  it("should remove the email when tagsHanlder call onEmailRemoveIndexHandler", () => {
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.emails = [
      {
        id: "1",
        email: "test1@asd.com"
      },
      {
        id: "2",
        email: "test2@asd.com"
      }
    ];

    emailInputConsumer.tagsHanlder.onRemoveCallback("1");
    expect(emailInputConsumer.getEmails()).toEqual(["test2@asd.com"]);
  });

  it("should call onChangeCallback with emails", () => {
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.onChangeCallback = jest.fn();
    emailInputConsumer.emails = [
      {
        id: "1",
        email: "test1@asd.com"
      },
      {
        id: "2",
        email: "test2@asd.com"
      }
    ];
    emailInputConsumer.onChangeHandler();
    expect(emailInputConsumer.onChangeCallback).toHaveBeenCalledWith([
      "test1@asd.com",
      "test2@asd.com"
    ]);
  });

  it("should add random emails", () => {
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.addRandomEmails();
    expect(emailInputConsumer.getEmails()).toEqual([
      "ivan@mail.ru",
      "max@mail.ru"
    ]);
  });

  it("should show alerts with emails counter", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.emails = [
      {
        id: "1",
        email: "test1@asd.com"
      },
      {
        id: "2",
        email: "test2@asd.com"
      }
    ];
    emailInputConsumer.getEmailsCount();
    expect(window.alert).toBeCalledWith(2);
  });

  it("should return email list", () => {
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.emails = [
      {
        id: "1",
        email: "test1@asd.com"
      },
      {
        id: "2",
        email: "test2@asd.com"
      }
    ];
    expect(emailInputConsumer.getEmails()).toEqual(["test1@asd.com", "test2@asd.com"]);
  });

  it("should replace all emails", () => {
    const dateNowStub = jest.fn(() => 1530518207007);
    global.Date.now = dateNowStub;
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.emails = [
      {
        id: "1",
        email: "test1@asd.com"
      },
      {
        id: "2",
        email: "test2@asd.com"
      }
    ];
    emailInputConsumer.replaceEmails(['test3@asd.com']);
    expect(emailInputConsumer.emails).toEqual([{
      id: "1530518207007",
      email: "test3@asd.com"
    }
    ]);
  });

  it("should call onChange callback", () => {
    const callback = jest.fn();
    const emailInputConsumer = new EIClass("emails-input-1");
    emailInputConsumer.onChange(callback);
    emailInputConsumer.onEmailSubmitHandler('email@gmail.com');
    expect(callback).toHaveBeenCalled();
  });
});
