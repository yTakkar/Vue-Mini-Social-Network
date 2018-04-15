const
  app = require('express').Router(),
  db = require('../config/db')

// FOR GETTING ALL THE USER POSTS
app.post('/get-posts', async (req, res) => {
  let
    id = await db.getId(req.body.username),
    posts = await db.query('SELECT * FROM posts WHERE user = ? ORDER BY post_id DESC', [id])
  res.json(posts)
})

// GET ALL FEEDS
app.post('/get-feeds', async (req, res) => {
  let feed = await db.query(
    'SELECT posts.post_id, posts.user, posts.username, posts.title, posts.content, posts.post_created FROM posts, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = posts.user ORDER BY posts.post_created DESC',
    [req.session.id]
  )
  res.json(feed)
})

// CREATE POST
app.post('/create-post', async (req, res) => {
  let {
      session: { id, username },
      body: { title, content }
    } = req,
    insert = {
      user: id,
      username,
      title,
      content,
      post_created: new Date().getTime(),
    },
    { insertId } = await db.query('INSERT INTO posts SET ?', insert)

  res.json({
    ...insert,
    post_id: insertId
  })
})

app.post('/valid-post', async (req, res) => {
  let [{ count }] = await db.query(
    'SELECT COUNT(post_id) AS count FROM posts WHERE post_id=? LIMIT 1',
    [ req.body.post ]
  )
  res.json(count == 0 ? false : true)
})

app.post('/post-details', async (req, res) => {
  let [ post ] = await db.query('SELECT * FROM posts WHERE post_id=? LIMIT 1', [req.body.post])
  res.json(post)
})

app.post('/delete-post', async (req, res) => {
  let { post } = req.body
  await db.query('DELETE FROM likes WHERE post_id=?', [ post ]),
  await db.query('DELETE FROM posts WHERE post_id = ?', [ post ])
  res.json({ mssg: 'Post Deleted!!' })
})

app.post('/edit-post', async (req, res) => {
  let { post, title, content } = req.body
  await db.query('UPDATE posts SET title=?, content=? WHERE post_id=?', [ title, content, post ])
  res.json({ mssg: 'Post Updated!!' })
})


module.exports = app
