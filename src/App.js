import { Provider } from "react-redux";
import Routes from "./Routes";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
