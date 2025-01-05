const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  const max = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === max)
}

const mostBlogs = (blogs) => {
  const authorcounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = ( counts[blog.author] || 0 ) + 1
    return counts
  }, {})

  theauthor = Object.keys(authorcounts).reduce((max, author) =>
    authorcounts[author] > (authorcounts[max] || 0) ? author : max
  )
  
  return {author: theauthor, blogs: authorcounts[theauthor]}

}

const mostLikes = (blogs) => {
  const authorcounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = ( counts[blog.author] || 0 ) + blog.likes
    return counts
  }, {})

  theauthor = Object.keys(authorcounts).reduce((max, author) =>
    authorcounts[author] > (authorcounts[max] || 0) ? author : max
  )
  
  return {author: theauthor, likes: authorcounts[theauthor]}

}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }