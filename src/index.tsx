import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import {Game} from "./components/Game";
import "bootstrap/dist/css/bootstrap.css";
import "./scss/main.scss";

ReactDOM.render(
    <Game />,
    document.getElementById("app"),
);
