const
  app = require('express').Router(),
  db = require('../config/db')

// CHECK IF SESSION LIKED THE NOTE OR NOT
app.post('/liked-or-not', async (req, res) => {
  let
    { body, session } = req,
    [{ l }] = await db.query(
      'SELECT COUNT(like_id) AS l FROM likes WHERE like_by=? AND post_id=?',
      [ session.id, body.post ]
    )
  res.json(l == 0 ? false : true)
})

// FOR LIKING THE NOTE
app.post('/like', async (req, res) => {
  let
    { session, body } = req,
    insert = {
      like_by: session.id,
      like_by_username: session.username,
      post_id: parseInt(body.post),
      like_time: new Date().getTime()
    },
    { insertId } = await db.query('INSERT INTO likes SET ?', insert)

  res.json({
    ...insert,
    like_id: insertId
  })
})

app.post('/unlike', async (req, res) => {
  let { session, body } = req
  await db.query('DELETE FROM likes WHERE post_id=? AND like_by=?', [ body.post, session.id ])
  res.json(null)
})

// GET LIKES OF THE NOTE
app.post('/likes', async (req, res) => {
  let likes = await db.query('SELECT * FROM likes WHERE post_id=? ORDER BY like_id DESC', [req.body.post])
  res.json(likes)
})

module.exports = app
