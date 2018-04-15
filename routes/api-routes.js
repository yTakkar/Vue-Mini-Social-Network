// API ROUTES

const
  app = require('express').Router(),
  db = require('../config/db')

// FOR CHECKING IF IT'S A VALID USER
app.post('/is-user-valid', async (req, res) => {
  let [{ userCount }] = await db.query(
    'SELECT COUNT(id) AS userCount FROM users WHERE username=? LIMIT 1',
    [req.body.username]
  )
  res.json(userCount == 1 ? true : false)
})

// FOR DETAILS OF GIVEN USER
app.post('/get-details', async (req, res) => {
  let get = await db.query(
    'SELECT id, username, email, bio, joined FROM users WHERE username=?',
    [req.body.username]
  )
  res.json(get[0])
})

// FOR EXPLORING NEW USERS
app.post('/get-explores', async (req, res) => {
  let
    { id: session } = req.session,
    exp = [],
    followings = await db.query(
      'SELECT id, username, email FROM users WHERE id <> ? ORDER BY RAND() LIMIT 10',
      [session]
    )

  for (let f of followings) {
    let is = await db.isFollowing(session, f.id)
    !is ? exp.push(f) : null
  }

  res.json(exp)
})

module.exports = app
