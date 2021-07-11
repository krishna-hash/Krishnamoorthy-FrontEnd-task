import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./Pages/LandingPage";
it("Form input error Checker", async () => {
  const { getByLabelText, getByTestId } = render(<App />);
  const name = getByLabelText("Select the User");
  const title = getByLabelText("Title");
  const body = getByLabelText("Body");
  fireEvent.blur(name);
  fireEvent.blur(title);
  fireEvent.blur(body);
  await waitFor(() => {
    expect(getByTestId("nameError")).toHaveTextContent("Please select a user");
    expect(getByTestId("titleError")).toHaveTextContent("title required");
    expect(getByTestId("bodyError")).toHaveTextContent("body required");
  });
});
it("Submit", async () => {
  const { getByTestId, getByText } = render(<App />);
  const button = getByText("Submit");
  fireEvent.click(button);
  await waitFor(() => {
    expect(getByTestId("Submit")).toMatchObject({});
  });
});