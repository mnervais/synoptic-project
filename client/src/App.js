import "./App.css";
import AppInput from "./components/atoms/AppInput";
import AppButton from "./components/atoms/AppButton";
import AppCard from "./components/atoms/AppCard";
import AppModal from "./components/molecules/AppModal";

function App() {
  return (
    <div className="App container">
      <form>
        <div className="form-group">
          <AppInput
            label="label"
            id="titleInput"
            className=""
            name="title"
            type="datetime-local"
            defaultValue="2022-09-02T13:02"
            min="2022-09-02T13:02"
          />
        </div>
        <AppButton
          id="button"
          className=""
          type="button"
          onClick={() => {}}
          onClickCallback={() => {}}
        >
          Hello
        </AppButton>
      </form>

      <AppCard>Hello</AppCard>

      <AppModal defaultOpen={true}>
        <AppModal.Header>
          <>Title</>
        </AppModal.Header>
        <AppModal.Body>
          <div>hello</div>
        </AppModal.Body>
        <AppModal.Footer>
          <div>hello</div>
        </AppModal.Footer>
      </AppModal>
    </div>
  );
}

export default App;
