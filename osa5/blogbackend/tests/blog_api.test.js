const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

test('Returns right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
})

test('Likes default to zero', async () =>  {
    const response = await api.get('/api/blogs')
    const likes = response.body.map(blog => blog.likes).filter(like => like >= 0).length
    assert.strictEqual(response.body.length, likes)
})

test('a blog can be added ', async () => {
    const newBlog = {
        title: "StringTest",
        author: "String",
        url: "String",
        likes: 75
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.title)
  
  
    assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  
    assert(contents.includes('StringTest'))
  })

  test('fails with status code 400 if title is missing', async () => {
    const newBlog = {
      author: 'John Doe',
      url: 'http://example.com',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  })

  test('fails with status code 400 if url is missing', async () => {
    const newBlog = {
      title: 'Missing URL Blog',
      author: 'John Doe',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  })

  describe('Deleting a blog', () => {
    test('Deleting one blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
  
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
  
        const blogsAtEnd = await helper.blogsInDb()
  
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

  })

  test('updates the likes of a blog', async () => {
    // Fetch all blogs
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    // Define the updated likes value
    const updatedLikes = { likes: blogToUpdate.likes + 1 };

    // Perform the PUT request to update the likes
    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .expect(200)
        .expect('Content-Type', /application\/json/);

    // Assert that the response contains the updated likes
    assert.strictEqual(response.body.likes, updatedLikes.likes);

    // Fetch all blogs after the update and verify the change
    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id);
    assert.strictEqual(updatedBlog.likes, updatedLikes.likes);
});


after(async () => {
    await mongoose.connection.close()
  })