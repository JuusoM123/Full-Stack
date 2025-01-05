import { useState } from 'react'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [showall, toggleshowlall] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const isOwner = () => {
    return (
      blog.user?.username === user?.username
    )
  }

  const handleToggle = () => {
    toggleshowlall(!showall)
  }

  const toggleButton = () => {
    return(
      <button onClick={handleToggle}>
        {showall ? 'Hide' : 'Show'}
      </button>
    )
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(blog.id, updatedBlog)
  }

  return(
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {toggleButton()}
      </div>
      {showall && (
        <div>
          <div>Author: {blog.author}</div>
          <div>
            Likes: {blog.likes}
            <button onClick={handleLike}>Like</button>
          </div>
          <div>URL: {blog.url}</div>
          <div>{isOwner() && (<button onClick={() => deleteBlog(blog.id)}>Delete</button>)}</div>
        </div>
      )}
    </div>
  )
}

export default Blog