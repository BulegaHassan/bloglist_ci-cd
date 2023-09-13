import { useState } from "react";
import Notification from "./Notification";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [notification, setNotification] = useState(null);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleAuthorChange = (e) => setAuthor(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);

  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  const addBlog = (e) => {
    e.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };
    createBlog(blogObject);
    setTitle("");
    setAuthor("");
    setUrl("");
    notify(`a new blog ${title} by ${author} added`);
  };
  return (
    <div>
      <Notification notification={notification} />

      <form onSubmit={addBlog}>
        <h1>create new</h1>
        <div>
          title:
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            autoComplete='off'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            id='author'
            name='author'
            value={author}
            autoComplete='off'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            id='url'
            name='url'
            value={url}
            autoComplete='off'
            onChange={handleUrlChange}
          />
        <button type='submit' id="create">create</button>
        </div>
      </form>
    </div>
  );
};
export default BlogForm;
