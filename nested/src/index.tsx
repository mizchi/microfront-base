import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import type { ApplicationProps } from "../../shell/src/types";

const run = (props: ApplicationProps) => {
  const root = props.getRoot();
  ReactDOM.render(
    <React.StrictMode>
      <App {...props} />
    </React.StrictMode>,
    root
  );
  return () => {
    ReactDOM.unmountComponentAtNode(root);
  };
};

export default run;
