import * as React from "react";
import * as ReactDOM from "react-dom";
import "./App.css";
import App from "./App";
import PluginCommunicator from "@ui/PluginCommunicator";

PluginCommunicator.init();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
