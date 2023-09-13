import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog/>", () => {
  const blog = {
    title: "fsopen teaches testing",
    author: "hassan bulega",
    url: "www.hasgo.com/heteaches",
    likes: 13,
    user: {
      name: "Abu",
    },
  };
  let container;
  const increaseLikes = jest.fn();
  beforeEach(() => {
    container = render(
      <Blog blog={blog} increaseLikes={increaseLikes} />
    ).container;
  });

  test(" blog renders the blog's title and author, but does not render its URL or number of likes by default", () => {
    const element = screen.getByText(`${blog.title} ${blog.author}`);

    const moreDetails = container.querySelector(".moreDetails");
    expect(moreDetails).toHaveStyle("display: none");

    expect(element).toBeDefined();
    expect(moreDetails).toBeDefined();
  });
  test("blog checking the URL and likes shown when a button controlling details is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".moreDetails");
    expect(div).not.toHaveStyle("display: none");
  });

  test(" if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const likeButton = screen.getByText("like");

    await user.click(likeButton);
    await user.click(likeButton);

    expect(increaseLikes.mock.calls).toHaveLength(2);
  });
});
