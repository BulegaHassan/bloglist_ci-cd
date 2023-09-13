import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState(null);
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      notify("Logged in successfully");

      setUsername("");
      setPassword("");
    } catch (error) {
      notify("wrong username or password", "alert");
    }
  };
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    notify("Logged out successfully");
  };
  const addBlog = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
  };
  const increaseLikes = (id) => {
    const blog = blogs.find((b) => b.id === id);
    console.log("id yaffe", id);
    const changedBlog = {
      user: blog.user,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      likes: blog.likes,
    };
    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch(notify("unable to update blog", "alert"));
  };
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
  const handleRemove = (id) => {
    console.log("removed");
    const toDelete = sortedBlogs.find((b) => b.id === id);
    console.log(id);
    const ok = window.confirm(
      `Remove blog ${toDelete.title} by ${toDelete.author}`
    );
    if (ok) {
      blogService.remove(id).then(() => {
        setBlogs(sortedBlogs.filter((b) => b.id !== id));
      });
    }
  };
  if (user === null) {
    return (
      <div>
        <h1>Login</h1>
        <Notification notification={notification} />

        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog'>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          increaseLikes={() => increaseLikes(blog.id)}
          handleRemove={handleRemove}
        />
      ))}
    </div>
  );
};
export default App;
