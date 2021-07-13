import React, { lazy, Suspense, useEffect, useState } from "react";

import {
  BrowserRouter,
  Route,
  Link,
  RouteChildrenProps,
} from "react-router-dom";
import { ApplicationProps } from "../../shell/src/types";

const Lazy = lazy(() => import("./Lazy"));

function Layout(props: {
  children: React.ReactNode;
  route: (externalUrl: string) => void;
}) {
  return (
    <div>
      <h2>React Router App</h2>
      <nav>
        <Link to="/nested">Nested Home</Link>
        {"|"}
        <Link to="/nested/a">A</Link>
        {"|"}
        <Link to="/nested/b">B</Link>
        {"|"}
        <a
          href="/external"
          onClick={(ev) => {
            ev.preventDefault();
            const anchor = ev.target as HTMLAnchorElement;
            props.route(anchor.href);
          }}
        >
          external
        </a>
      </nav>
      {props.children}
    </div>
  );
}

function Home() {
  return <div>Home</div>;
}

function A() {
  return <div>a</div>;
}

function B() {
  return (
    <Suspense fallback="loading...">
      <Lazy />
    </Suspense>
  );
}

function Fallback(props: RouteChildrenProps) {
  useEffect((): void => {
    console.log("fallback", props);
  }, []);
  return <></>;
}

function App(props: ApplicationProps) {
  return (
    <BrowserRouter>
      <Layout route={props.route}>
        <Route exact path="/nested" component={Home} />
        <Route exact path="/nested/a" component={A} />
        <Route exact path="/nested/b" component={B} />
        <Route component={Fallback} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
