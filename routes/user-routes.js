const
  app = require('express').Router(),
  db = require('../config/db'),
  { promisify } = require('util'),
  mw = require('../config/middlewares'),
  fs = require('fs'),
  dir = process.cwd(),
  { DeleteAllOfFolder } = require('handy-image-processor')

app.get('/signup', mw.NotLoggedIn, (req, res) => {
  let options = { title: 'Signup For Free' }
  res.render('signup', { options })
})

app.get('/login', mw.NotLoggedIn, (req, res) => {
  let options = { title: 'Login To Continue' }
  res.render('login', { options })
})

app.get('/logout', mw.LoggedIn, (req, res) => {
  let url = req.session.reset() ? '/login' : '/'
  res.redirect(url)
})

app.post('/user/signup', async (req, res) => {
  let {
    body: { username, email, password, password_again },
    session
  } = req

  req.checkBody('username', 'Username is empty!!').notEmpty()
  req.checkBody('username', 'Username must contain only leters').isAlpha()
  req.checkBody('username', 'Username must be greater than 4').isLength({ min: 4 })
  req.checkBody('username', 'Username must be less than 32').isLength({ max: 32 })

  req.checkBody('email', 'Email is empty').notEmpty()
  req.checkBody('email', 'Email is invalid').isEmail()

  req.checkBody('password', 'Password field is empty').notEmpty()
  req.checkBody('password_again', 'Password field is empty').notEmpty()
  req.checkBody('password', 'Passwords don\'t match').equals(password_again)

  let errors = await req.getValidationResult()

  if (!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg) )
    res.json({ mssg: array })
  } else {

    let
      [{ usernameCount }] = await db.query(
        'SELECT COUNT(username) as usernameCount from users WHERE username = ?',
        [username]
      ),
      [{ emailCount }] = await db.query(
        'SELECT COUNT(email) as emailCount from users WHERE email = ?',
        [email]
      )

    if (usernameCount == 1){
      res.json({ mssg: 'Username already exists!!' })
    } else if (emailCount == 1){
      res.json({ mssg: 'Email already exists!!' })
    } else {

      let
        newUser = {
          username,
          email,
          password,
          bio: '',
          joined: new Date().getTime()
        },
        { insertId } = await db.create_user(newUser),
        mkdir = promisify(fs.mkdir)

      await mkdir(dir + `/public/users/${insertId}`)
      fs
        .createReadStream(dir + '/public/images/spacecraft.jpg')
        .pipe(fs.createWriteStream(dir + `/public/users/${insertId}/avatar.jpg`))

      session.id = insertId
      session.username = username

      res.json({
        mssg: `Hello, ${username}!!`,
        success: true
      })

    }

  }

})

app.post('/user/login', async (req, res) => {
  let {
    body: { username: rusername, password: rpassword },
    session
  } = req

  req.checkBody('username', 'Username is empty!!').notEmpty()
  req.checkBody('password', 'Password field is empty!!').notEmpty()

  let errors = await req.getValidationResult()
  if(!errors.isEmpty()) {
    let array = []
    errors.array().forEach(e => array.push(e.msg) )
    res.json({ mssg: array })
  } else {

    let [{ userCount, id, password }] = await db.query(
      'SELECT COUNT(id) as userCount, id, password from users WHERE username=? LIMIT 1',
      [rusername]
    )

    if(userCount == 0) {
      res.json({ mssg: 'User not found!!' })
    } else {
      let same = await db.comparePassword(rpassword, password)
      if (!same){
        res.json({ mssg: 'Wrong password!!' })
      } else {

        session.id = id
        session.username = rusername

        res.json({
          mssg: `Hello, ${rusername}!!`,
          success: true
        })

      }
    }

  }

})

app.post('/api/deactivate', async (req, res) => {
  let
    { id } = req.session,
    rmdir = promisify(fs.rmdir)

  await db.query('DELETE FROM profile_views WHERE view_by=?', [id])
  await db.query('DELETE FROM profile_views WHERE view_to=?', [id])
  await db.query('DELETE FROM follow_system WHERE follow_by=?', [id])
  await db.query('DELETE FROM follow_system WHERE follow_to=?', [id])
  await db.query('DELETE FROM likes WHERE like_by=?', [id])
  let notes = await db.query('SELECT post_id FROM posts WHERE user=?', [id])
  notes.map(n => db.query('DELETE FROM likes WHERE post_id=?', [n.note_id]))
  await db.query('DELETE FROM posts WHERE user=?', [id])
  await db.query('DELETE FROM users WHERE id=?', [id])

  await DeleteAllOfFolder(`${dir}/public/users/${id}/`)
  await rmdir(`${dir}/public/users/${id}/`)

  req.session.id = null
  res.json(null)
})

module.exports = app
