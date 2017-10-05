const
  app = require('express').Router(),
  db = require('../config/db'),
  dir = process.cwd(),
  upload = require('multer')({
    dest: `${dir}/public/tmp/`
  }),
  { ProcessImage, DeleteAllOfFolder } = require('handy-image-processor')

// FOR GETTING THE COUNT OF GIVEN FIELD
app.post('/what-exists', async (req, res) => {
  let
    { what, value } = req.body,
    [{ count }] = await db.query(`SELECT COUNT(${what}) AS count FROM users WHERE ${what}=?`, [value])
  res.json(count)
})

app.post('/edit-profile', async (req, res) => {
  let
    { username, email, bio } = req.body,
    { id: session } = req.session

  req.checkBody('username', 'Username is empty!!').notEmpty()
  req.checkBody('username', 'Username must contain only leters!!').isAlpha()
  req.checkBody('username', 'Username must be greater than 4!!').isLength({ min: 4 })
  req.checkBody('username', 'Username must be less than 32!!').isLength({ max: 32 })

  req.checkBody('email', 'Email is empty!!').notEmpty()
  req.checkBody('email', 'Email is invalid!!').isEmail()

  let errors = await req.getValidationResult()
  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg) )
    res.json({ mssg: array })
  } else {
    req.session.username = username

    await db.query('UPDATE users SET username=?, email=?, bio=? WHERE id=?', [username, email, bio, session]),
    await db.query('UPDATE posts SET username=? WHERE user=?', [username, session])
    await db.query('UPDATE follow_system SET follow_by_username = ? WHERE follow_by=?', [username, session]),
    await db.query('UPDATE follow_system SET follow_to_username = ? WHERE follow_to=?', [username, session]),
    await db.query('UPDATE profile_views SET view_by_username = ? WHERE view_by=?', [username, session]),
    await db.query('UPDATE likes SET like_by_username = ? WHERE like_by = ?', [ username, session ])

    res.json({ mssg: 'Profile edited!!' })
  }

})

app.post('/change-avatar', upload.single('avatar'), async (req, res) => {
  let
    { id } = req.session,
    obj = {
      srcFile: req.file.path,
      width: 200,
      height: 200,
      destFile: `${dir}/public/users/${id}/avatar.jpg`
    }

  await ProcessImage(obj)
  await DeleteAllOfFolder(`${dir}/public/tmp/`)

  res.json({ mssg: 'Avatar Changed!!' })
})

module.exports = app
