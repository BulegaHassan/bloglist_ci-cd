import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm/> check, that the form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const blog = {
    title: "fsopen teaches testing",
    author: "hassan bulega",
    likes: 13,
    url: "www.hasgo.com/heteaches",
    user: {
      name: "Abu",
    },
  };
  const createBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm createBlog={createBlog} />);
  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");
  const submitButton = screen.getByText("create");

  await user.type(titleInput, blog.title);
  await user.type(authorInput, blog.author);
  await user.type(urlInput, blog.url);
  await user.click(submitButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title);
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author);
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url);
});
