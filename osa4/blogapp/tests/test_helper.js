const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "String",
    author: "String",
    url: "String",
    likes: 69
  },
  {
    title: "String2",
    author: "String",
    url: "String",
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blogs => blogs.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}