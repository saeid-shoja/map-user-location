import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import SearchInput from "../SearchInput";
import "@testing-library/jest-dom";

const mockSetSelectedLocation = jest.fn();

describe("SearchInput", () => {
  describe("search input and button", () => {
    it("should render input element", async () => {
      render(<SearchInput setSelectedLocation={mockSetSelectedLocation} />);
      const inputElement = screen.getByPlaceholderText(
        "Write your intended location"
      );
      expect(inputElement).toBeInTheDocument();
    });

    it("should change value of input", async () => {
      render(<SearchInput setSelectedLocation={mockSetSelectedLocation} />);
      const inputElement = screen.getByPlaceholderText(
        "Write your intended location"
      );
      fireEvent.change(inputElement, { target: { value: "london" } });
      expect(inputElement.value).toBe("london");
    });

    it("should remove value of input", async () => {
      render(<SearchInput setSelectedLocation={mockSetSelectedLocation} />);
      const inputElement = screen.getByPlaceholderText(
        "Write your intended location"
      );
      const searchButton = screen.getByRole("button", { name: /search/i });
      fireEvent.change(inputElement, { target: { value: "london" } });
      fireEvent.click(searchButton);
      expect(inputElement.value).toBe("");
    });
  });

  describe("should list created", () => {
    it("searched location should add to list of locations after click", async () => {
      render(<SearchInput setSelectedLocation={mockSetSelectedLocation} />);
      const searchButton = screen.getByRole("button", { name: /search/i });
      const inputElement = screen.getByPlaceholderText(
        "Write your intended location"
      );
      fireEvent.change(inputElement, { target: { value: /lon/i } });
      fireEvent.click(searchButton);
      const listItemElement = await screen.findAllByTestId("list-item-wrapper");
      expect(listItemElement.length).not.toBe(0);
    });
  });

  describe("spinner be true and then to be false", () => {
    it("spinner should be visible after click", async () => {
      render(<SearchInput setSelectedLocation={mockSetSelectedLocation} />);
      const searchButton = screen.getByRole("button", { name: /search/i });
      const inputElement = screen.getByPlaceholderText(
        "Write your intended location"
      );
      fireEvent.change(inputElement, { target: { value: /lon/i } });
      fireEvent.click(searchButton);
      const spinnerElement = await screen.findByTestId("loading-spinner");
      expect(spinnerElement).toBeVisible();
    });
  });
});
