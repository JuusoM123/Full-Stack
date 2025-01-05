import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setAuthor('')
    setUrl('')
    setTitle('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm