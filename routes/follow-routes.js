const
  app = require('express').Router(),
  db = require('../config/db')

// TO CHECK IF SESSION FOLLOWING USER
app.post('/is-following', async (req, res) => {
  let {
      body: { username },
      session: { id: session }
    } = req,
    id = await db.getId(username),
    is = await db.isFollowing(session, id)
  res.json(is)
})

app.post('/follow', async (req, res) => {
  let
    { user, username } = req.body,
    { id: session, username: susername } = req.session,
    insert = {
      follow_by: session,
      follow_by_username: susername,
      follow_to: user,
      follow_to_username: username,
      follow_time: new Date().getTime(),
    },
    { insertId } = await db.query('INSERT INTO follow_system SET ?', insert)

  res.json({
    ...insert,
    follow_id: insertId
  })
})

app.post('/unfollow', async (req, res) => {
  let { session, body } = req
  await db.query('DELETE FROM follow_system WHERE follow_by=? AND follow_to=?', [ session.id, body.user ])
  res.json({ mssg: 'Unfollowed!!' })
})

// TO GET FOLLOWERS
app.post('/get-followers', async (req, res) => {
  let
    id = await db.getId(req.body.username),
    followers = await db.query('SELECT * FROM follow_system WHERE follow_to=? ORDER BY follow_time DESC', [ id ])
  res.json(followers)
})

// TO GET FOLLOWINGS
app.post('/get-followings', async (req, res) => {
  let
    id = await db.getId(req.body.username),
    followings = await db.query('SELECT * FROM follow_system WHERE follow_by=? ORDER BY follow_time DESC', [id])
  res.json(followings)
})

// GET NO OF FOLLOWERS
app.post('/no-of-followers', async (req, res) => {
  let [{ count }] = await db.query(
    'SELECT COUNT(follow_id) AS count FROM follow_system WHERE follow_to=?',
    [ req.body.user ]
  )
  res.json(count)
})

// FOR PROFILE VIEW
app.post('/view-profile', async (req, res) => {
  let
    { username } = req.body,
    { id: session } = req.session,
    id = await db.getId(username),
    [{ time: dtime }] = await db.query(
      'SELECT MAX(view_time) as time FROM profile_views WHERE view_by=? AND view_to=?',
      [session, id]
    ),
    time = parseInt(new Date().getTime() - parseInt(dtime))

  if (time >= 150000 || !dtime) {    // 120000 = 2.5 minutes
    let insert = {
      view_by: session,
      view_by_username: username,
      view_to: id,
      view_time: new Date().getTime()
    }
    await db.query('INSERT INTO profile_views SET ?', insert)
  }

  res.json('Hello, World!!')
})

// FOR GETTING PROFILE VIEWS
app.post('/get-profile-views', async (req, res) => {
  let
    { username } = req.body,
    id = await db.getId(username),
    [{ count }] = await db.query('SELECT COUNT(view_id) AS count FROM profile_views WHERE view_to = ?', [id])
  res.json(count)
})

module.exports = app
