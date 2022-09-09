import { screen, render, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("SearchInput", () => {
  it("should render input element", async () => {
    render(<App />);
    const searchButton = screen.getByRole("button", { name: /search/i });
    const inputElement = screen.getByPlaceholderText(
      "Write your intended location"
    );
    fireEvent.change(inputElement, { target: { value: /lon/i } });
    fireEvent.click(searchButton);
    const itemElement = screen.queryAllByTestId("list-item");
    const marketElement = screen.queryByTestId("marker-position");
    itemElement.forEach((item) => {
      expect(item.textContent).toMatch(/lo/i);
      fireEvent.click(item);
      expect(marketElement?._letLng).toEqual(item.letLng);
    });
  });
});
