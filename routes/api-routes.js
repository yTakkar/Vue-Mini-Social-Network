// API ROUTES
require('../sendgrid.env')
const
  app = require('express').Router(),
  db = require('../config/db'),
  sgMail = require('@sendgrid/mail')


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

app.post ('/submitAdRequest', async (req, res) => {

  let {name, company, email, phone, desc, url} = req.body

  sgMail.setApiKey(SENDGRID_API_KEY)
  sgMail.setSubstitutionWrappers('{{', '}}')

  const msg = {
    to: 'yuz310@ucsd.edu',
    from: 'ads@SpeakEasy.com',
    subject: 'SpeakEasy Ad Publish Request',
    html: '<html><h2>SpeakEasy Ad Request</h2><br><h3>Name: {{name}}</h3><h3>Company: {{company}}</h3><h3>Phone: {{phone}}</h3><h3>Email: {{email}}</h3><h3>Description: {{desc}}</h3><h3>Image: </h3><br><img src={{url}}/></html>',
    substitutions: {
      'name': name,
      'email': email,
      'company': company,
      'phone': phone,
      'desc': desc,
      'url': url
    }
  }

  console.log ('Sending ' + JSON.stringify(msg))
  sgMail.send(msg)

})

module.exports = app
