import { useState } from "react";

const Blog = ({ blog, increaseLikes, handleRemove }) => {
  const [hide, setHide] = useState(false);
  const showWhenVisible = { display: hide ? "" : "none" };
  const handleClick = () => {
    setHide(!hide);
  };

  const ourStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={ourStyle}>
      <div>
        {blog.title} {blog.author}{" "}
        <button onClick={handleClick}>{hide ? "hide" : "view"}</button>
      </div>
      {hide === true ? (
        <div style={showWhenVisible} className='moreDetails'>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={increaseLikes}>like</button>
          </p>
          <p>{blog?.user?.name}</p>
          <p>
            <button onClick={() => handleRemove(blog.id)}>remove</button>
          </p>
        </div>
      ) : (
        <div style={showWhenVisible} className='moreDetails'></div>
      )}
    </div>
  );
};

export default Blog;
