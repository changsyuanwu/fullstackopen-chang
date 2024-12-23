import { render, screen } from "@testing-library/react";
import Note from "./Note";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const { container } = render(<Note note={note} />);

  // Two different ways of testing if the element was rendered
  const div = container.querySelector(".note");
  expect(div).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  // Note that getByText throws an exception if the element is not found
  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  ); // { exact: false } can use this option to find an element that contains the text
  expect(element).toBeDefined();

  /*
  const { container } = render(<NoteForm createNote={createNote} />)
  // This also works for an element with id "note-input"
  const input = container.querySelector('#note-input')
  */

  // Can use this to print out specific elements or the entire screen
  // screen.debug(element);
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  // Mock function defined by vitest
  const mockHandler = vi.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  // Creates a session that we can use to interact with elements
  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("does not render this", () => {
  const note = {
    content: "This is a reminder",
    important: true,
  };

  render(<Note note={note} />);

  const element = screen.queryByText("do not want this thing to be rendered");
  expect(element).toBeNull();
});