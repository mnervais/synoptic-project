// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import AppButton from "./components/atoms/AppButton";
// import AppCard from "./components/atoms/AppCard";
// import AppInput from "./components/atoms/AppInput";
// import AppListItem from "./components/atoms/AppListItem";
// import AppModal from "./components/molecules/AppModal";
// import EventCard from "./components/molecules/EventCard";
// import EventList from "./components/molecules/EventList";
// import SearchBar from "./components/molecules/SearchBar";
// import EventInputModal from "./components/organisms/EventInputModal";
// import EventSearchBar from "./components/organisms/EventSearchBar";
// import App from "./App";

// describe("Unit tests (/atoms)", () => {
//   // AppButton.js
//   describe("AppButton.js", () => {
//     it("Renders with correct props", () => {
//       render(
//         <AppButton
//           id="button"
//           className="test"
//           type="button"
//           onClick={() => {
//             return "hello";
//           }}
//           onClickCallback={() => {
//             return "hello";
//           }}
//         >
//           Hello
//         </AppButton>
//       );

//       const buttonEl = screen.getByText(/Hello/);
//       expect(buttonEl).toBeInTheDocument();
//       expect(buttonEl).toHaveProperty("id", "button");
//       let classes = buttonEl.getAttribute("class");
//       expect(classes.includes("test"));
//       expect(buttonEl).toHaveProperty("type", "button");
//       expect(typeof buttonEl.onclick).toBe("function");
//     });

//     it("Runs both onclick functions", () => {
//       const onClickProp = jest.fn();
//       const onClickCallbackProp = jest.fn();

//       render(
//         <AppButton
//           id="button"
//           className="test"
//           type="button"
//           onClick={() => {
//             onClickProp();
//           }}
//           onClickCallback={() => {
//             onClickCallbackProp();
//           }}
//         >
//           Hello
//         </AppButton>
//       );

//       const buttonEl = screen.getByText(/Hello/);
//       fireEvent.click(buttonEl);
//       expect(onClickProp).toHaveBeenCalled();
//       expect(onClickCallbackProp).toHaveBeenCalled();
//     });
//   });

//   // AppCard.js
//   describe("AppCard.js", () => {
//     it("Renders with correct children", () => {
//       render(<AppCard>Hello</AppCard>);

//       const cardEl = screen.getByText(/Hello/);
//       expect(cardEl).toBeInTheDocument();
//     });
//   });

//   // AppInput.js
//   describe("AppInput.js", () => {
//     it("Renders with correct children", () => {
//       render(
//         <AppInput
//           label="label"
//           id="textInput"
//           className="test"
//           name="title"
//           type="text"
//           defaultValue="defaultValue"
//         />
//       );

//       const inputEl = screen.getByLabelText("label");
//       expect(inputEl).toBeInTheDocument();
//       expect(inputEl).toHaveProperty("id", "textInput");
//       let classes = inputEl.getAttribute("class");
//       expect(classes.includes("test"));
//       expect(inputEl).toHaveProperty("name", "title");
//       expect(inputEl).toHaveProperty("type", "text");
//       expect(inputEl).toHaveProperty("value", "defaultValue");
//     });

//     it("Updates value to user input", () => {
//       render(
//         <AppInput
//           label="label"
//           id="textInput"
//           className="test"
//           name="title"
//           type="text"
//           defaultValue="defaultValue"
//         />
//       );

//       const inputEl = screen.getByLabelText("label");
//       inputEl.setAttribute("value", "testinput");
//       expect(inputEl).toHaveAttribute("value", "testinput");
//     });

//     it("Prevents min input with timedate-local", () => {
//       render(
//         <AppInput
//           label="label"
//           id="datetime-localInput"
//           className="test"
//           name="title"
//           type="datetime-local"
//           defaultValue="2022-09-02T13:02"
//           min="2022-09-02T13:02"
//         />
//       );

//       const inputEl = screen.getByLabelText("label");
//       expect(inputEl).toHaveAttribute("min", "2022-09-02T13:02");
//     });
//   });

//   // AppListItem.js
//   describe("AppListItem.js", () => {
//     it("Renders with correct children", () => {
//       render(
//         <AppListItem id="item" className="test" onClick={() => {}}>
//           Hello
//         </AppListItem>
//       );

//       const listEl = screen.getByText(/Hello/);
//       expect(listEl).toBeInTheDocument();
//       expect(listEl).toHaveProperty("id", "item");
//       let classes = listEl.getAttribute("class");
//       expect(classes.includes("test"));
//       expect(typeof listEl.onclick).toBe("function");
//     });

//     it("Runs onclick function", () => {
//       const onClickProp = jest.fn();

//       render(
//         <AppListItem
//           id="item"
//           className="test"
//           onClick={() => {
//             onClickProp();
//           }}
//         >
//           Hello
//         </AppListItem>
//       );

//       const listEl = screen.getByText(/Hello/);
//       fireEvent.click(listEl);
//       expect(onClickProp).toHaveBeenCalled();
//     });
//   });
// });

// describe("Intergration tests (/molecules)", () => {
//   // AppModal.js
//   describe("AppModal.js", () => {
//     it("Renders with correct props", () => {
//       render(
//         <AppModal onClick={() => {}} onClickCallback={() => {}}>
//           <AppModal.Header>header</AppModal.Header>
//           <AppModal.Body>body</AppModal.Body>
//           <AppModal.Footer>footer</AppModal.Footer>
//         </AppModal>
//       );

//       const modalEl = screen.getByText(/header/);
//       expect(modalEl).toBeInTheDocument();
//       expect(screen.getByText(/body/)).toBeInTheDocument();
//       expect(screen.getByText(/footer/)).toBeInTheDocument();
//     });

//     it("Runs onclick functions", () => {
//       const onClickProp = jest.fn();
//       const onClickCallbackProp = jest.fn();

//       render(
//         <AppModal
//           onClick={() => onClickProp()}
//           onClickCallback={() => onClickCallbackProp()}
//         >
//           <AppModal.Header>header</AppModal.Header>
//           <AppModal.Body>body</AppModal.Body>
//           <AppModal.Footer>footer</AppModal.Footer>
//         </AppModal>
//       );

//       const modalEl = screen.queryByText(/header/);
//       const modelElButton = screen.getByRole("button");

//       fireEvent.click(modelElButton);
//       expect(onClickProp).toHaveBeenCalled();
//       expect(onClickCallbackProp).toHaveBeenCalled();
//     });
//   });

//   // EventCard.js
//   describe("EventCard.js", () => {
//     it("Renders with correct props", () => {
//       const event = {
//         id: 1,
//         title: "Test Event 1",
//         date: "2022-09-03T23:00:00.000Z",
//         time: "21:09:00",
//         description: "",
//         contact: "51.506615, -0.161353",
//         long: -0.161353,
//         lat: 51.506615,
//       };
//       const result = render(
//         <EventCard id="test" className="mt-2" event={event} />
//       );

//       const el = result.container.querySelector("#test");
//       expect(el).toBeInTheDocument();
//       expect(el).toHaveProperty("id", "test");
//       let classes = el.getAttribute("class");
//       expect(classes.includes("mt-2"));
//     });
//   });

//   // EventList.js
//   describe("EventList.js", () => {
//     it("Renders with events", () => {
//       const events = [
//         {
//           id: 1,
//           title: "Test Event 1",
//           date: "2022-09-03T23:00:00.000Z",
//           time: "21:09:00",
//           description: "",
//           contact: "51.506615, -0.161353",
//           long: -0.161353,
//           lat: 51.506615,
//         },
//       ];

//       render(
//         <EventList
//           events={events}
//           id=""
//           className="mt-2"
//           onClickCallback={(item) => {}}
//         />
//       );

//       const el = screen.getByText(/Test Event 1/);
//       expect(el).toBeInTheDocument();
//     });

//     it("Runs onclick function", () => {
//       const onClickCallbackProp = jest.fn();
//       const events = [
//         {
//           id: 1,
//           title: "Test Event 1",
//           date: "2022-09-03T23:00:00.000Z",
//           time: "21:09:00",
//           description: "",
//           contact: "51.506615, -0.161353",
//           long: -0.161353,
//           lat: 51.506615,
//         },
//       ];

//       render(
//         <EventList
//           events={events}
//           id=""
//           className="mt-2"
//           onClick={(item) => onClickCallbackProp()}
//         />
//       );

//       const el = screen.getByText(/Test Event 1/);
//       const elButton = screen.getByRole("button");

//       expect(el).toBeInTheDocument();

//       fireEvent.click(elButton);
//       expect(onClickCallbackProp).toHaveBeenCalled();
//     });
//   });

//   // SearchBar.js
//   describe("SearchBar.js", () => {
//     it("Updates value to user input", () => {
//       render(
//         <SearchBar
//           id="searchBar"
//           className="searchBar"
//           onChangeCallback={(value) => {}}
//         />
//       );

//       const el = screen.getByPlaceholderText(/Search.../);
//       el.setAttribute("value", "testinput");
//       expect(el).toHaveAttribute("value", "testinput");
//     });
//   });
// });

// describe("Intergration tests (/organisms)", () => {
//   // EventInputModal.js
//   describe("EventInputModal.js", () => {
//     it("Displays on double click", async () => {
//       const { container } = render(<App />);

//       await waitFor(() => container.querySelector("#App"));
//       const map = await container.querySelector("#App");
//       console.log(map);
//     });
//   });
// });
