import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import LandingPage from "./Pages/LandingPage"

function Router() {
  return (
    <BrowserRouter>
      <Route path="/" component={LandingPage}></Route>
    </BrowserRouter>
  );
}

export default Router;
