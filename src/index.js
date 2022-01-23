import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";

import "./index.css";
import App from "./App";
import Root from "./components/Root";
import storage from "./utils/storage";
import { configureClient } from "./api/client";
import configureStore from "./store";

const accessToken = storage.get("auth");
configureClient({ accessToken });
const history = createBrowserHistory();

const store = configureStore({ auth: !!accessToken }, { history });

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history}>
      <App />
    </Root>
  </React.StrictMode>,
  document.getElementById("root")
);
