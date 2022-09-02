import { render, screen, fireEvent, within } from "@testing-library/react";
import AppButton from "./components/atoms/AppButton";
import AppCard from "./components/atoms/AppCard";
import AppInput from "./components/atoms/AppInput";
import AppListItem from "./components/atoms/AppListItem";

describe("Unit tests (/atoms)", () => {
  // AppButton.js
  describe("AppButton.js", () => {
    it("Renders with correct props", () => {
      render(
        <AppButton
          id="button"
          className="test"
          type="button"
          onClick={() => {
            return "hello";
          }}
          onClickCallback={() => {
            return "hello";
          }}
        >
          Hello
        </AppButton>
      );

      const buttonEl = screen.getByText(/Hello/);
      expect(buttonEl).toBeInTheDocument();
      expect(buttonEl).toHaveProperty("id", "button");
      let classes = buttonEl.getAttribute("class");
      expect(classes.includes("test"));
      expect(buttonEl).toHaveProperty("type", "button");
      expect(typeof buttonEl.onclick).toBe("function");
    });

    it("Runs both onclick functions", () => {
      const onClickProp = jest.fn();
      const onClickCallbackProp = jest.fn();

      render(
        <AppButton
          id="button"
          className="test"
          type="button"
          onClick={() => {
            onClickProp();
          }}
          onClickCallback={() => {
            onClickCallbackProp();
          }}
        >
          Hello
        </AppButton>
      );

      const buttonEl = screen.getByText(/Hello/);
      fireEvent.click(buttonEl);
      expect(onClickProp).toHaveBeenCalled();
      expect(onClickCallbackProp).toHaveBeenCalled();
    });
  });

  // AppCard.js
  describe("AppCard.js", () => {
    it("Renders with correct children", () => {
      render(<AppCard>Hello</AppCard>);

      const cardEl = screen.getByText(/Hello/);
      expect(cardEl).toBeInTheDocument();
    });
  });

  // AppInput.js
  describe("AppInput.js", () => {
    it("Renders with correct children", () => {
      render(
        <AppInput
          label="label"
          id="textInput"
          className="test"
          name="title"
          type="text"
          defaultValue="defaultValue"
        />
      );

      const inputEl = screen.getByLabelText("label");
      expect(inputEl).toBeInTheDocument();
      expect(inputEl).toHaveProperty("id", "textInput");
      let classes = inputEl.getAttribute("class");
      expect(classes.includes("test"));
      expect(inputEl).toHaveProperty("name", "title");
      expect(inputEl).toHaveProperty("type", "text");
      expect(inputEl).toHaveProperty("value", "defaultValue");
    });

    it("Updates value to user input", () => {
      render(
        <AppInput
          label="label"
          id="textInput"
          className="test"
          name="title"
          type="text"
          defaultValue="defaultValue"
        />
      );

      const inputEl = screen.getByLabelText("label");
      inputEl.setAttribute("value", "testinput");
      expect(inputEl).toHaveAttribute("value", "testinput");
    });

    it("Prevents min input with timedate-local", () => {
      render(
        <AppInput
          label="label"
          id="datetime-localInput"
          className="test"
          name="title"
          type="datetime-local"
          defaultValue="2022-09-02T13:02"
          min="2022-09-02T13:02"
        />
      );

      const inputEl = screen.getByLabelText("label");
      expect(inputEl).toHaveAttribute("min", "2022-09-02T13:02");
    });
  });

  // AppListItem.js
  describe("AppListItem.js", () => {
    it("Renders with correct children", () => {
      render(
        <AppListItem id="item" className="test" onClick={() => {}}>
          Hello
        </AppListItem>
      );

      const listEl = screen.getByText(/Hello/);
      expect(listEl).toBeInTheDocument();
      expect(listEl).toHaveProperty("id", "item");
      let classes = listEl.getAttribute("class");
      expect(classes.includes("test"));
      expect(typeof listEl.onclick).toBe("function");
    });

    it("Runs onclick function", () => {
      const onClickProp = jest.fn();

      render(
        <AppListItem
          id="item"
          className="test"
          onClick={() => {
            onClickProp();
          }}
        >
          Hello
        </AppListItem>
      );

      const listEl = screen.getByText(/Hello/);
      fireEvent.click(listEl);
      expect(onClickProp).toHaveBeenCalled();
    });
  });
});
