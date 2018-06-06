const
  app = require('express').Router(),
  db = require('../config/db'),
  forge = require('node-forge'),
  rsa = forge.pki.rsa

// FOR GETTING ALL THE USER POSTS
app.post('/get-posts', async (req, res) => {
  let
    session = req.session.id,
    id = await db.getId(req.body.username),
    [{count}] = await db.query('SELECT COUNT(confirmed) AS count FROM follow_system WHERE follow_by = ? AND follow_to = ? AND confirmed=1',[session,id]),
    posts = await db.query('SELECT * FROM posts WHERE user = ? ORDER BY post_id DESC', [id])
  if (count == 0 && session!=id) {
    res.json([])
  }
  else if (session==id){
    for(let i = 0; i < posts.length; i=i+1){
      posts[i].title = decryptPost_with_aeskey(req.session.aeskey, posts[i].title)
      posts[i].content = decryptPost_with_aeskey(req.session.aeskey, posts[i].content)
    }
    res.json(posts)
  }else{
    let 
      [{encryptedkey: en_aeskey}] = await db.query('SELECT * FROM encrypted_keys_system WHERE follow_by=? AND follow_to=?',[session,id]),
      aeskey = decryptAeskey_with_privatekey(req.session.prikey, en_aeskey)
    for(let i = 0; i < posts.length; i=i+1){
      posts[i].title = decryptPost_with_aeskey(aeskey, posts[i].title)
      posts[i].content = decryptPost_with_aeskey(aeskey, posts[i].content)
    }
    res.json(posts)
  }

})

// GET ALL FEEDS
app.post('/get-feeds', async (req, res) => {
  let feed = await db.query(
    'SELECT posts.post_id, posts.user, posts.username, posts.title, posts.content, posts.post_created FROM posts, follow_system WHERE follow_system.follow_by = ? AND follow_system.follow_to = posts.user AND follow_system.confirmed = true ORDER BY posts.post_created DESC LIMIT 100',
    [req.session.id]
  ),
    session = req.session.id
    for(let i = 0; i < feed.length; i=i+1){
      let
        id = feed[i].user,
        [{encryptedkey: en_aeskey}] = await db.query('SELECT * FROM encrypted_keys_system WHERE follow_by=? AND follow_to=?',[session,id]),
        aeskey = decryptAeskey_with_privatekey(req.session.prikey, en_aeskey)
      feed[i].title = decryptPost_with_aeskey(aeskey, feed[i].title)
      feed[i].content = decryptPost_with_aeskey(aeskey, feed[i].content)
    }
  res.json(feed)
})

// CREATE POST
app.post('/create-post', async (req, res) => {
  let {
      session: { id, username, aeskey },
      body: { title, content, img_id }
    } = req,
    insert = {
      user: id,
      username,
      title: encryptPost(aeskey, title),
      content: encryptPost(aeskey, content),
      img_id,
      post_created: new Date().getTime(),
    },
    { insertId } = await db.query('INSERT INTO posts SET ?', insert)

  res.json({
    user: id,
    username,
    title: title,
    content: content,
    post_created: insert.post_created,
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
  let [ post ] = await db.query('SELECT * FROM posts WHERE post_id=? LIMIT 1', [req.body.post]),
    session = req.session.id,
    id = post.user
    if(session!=id){
      let
        [{encryptedkey: en_aeskey}] = await db.query('SELECT * FROM encrypted_keys_system WHERE follow_by=? AND follow_to=?',[session,id]),
        aeskey = decryptAeskey_with_privatekey(req.session.prikey, en_aeskey)
        post.title = decryptPost_with_aeskey(aeskey, post.title)
        post.content = decryptPost_with_aeskey(aeskey, post.content)
    }else{
      post.title = decryptPost_with_aeskey(req.session.aeskey, post.title)
      post.content = decryptPost_with_aeskey(req.session.aeskey, post.content)
    }
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
  await db.query('UPDATE posts SET title=?, content=? WHERE post_id=?', [ encryptPost(req.session.aeskey,title), encryptPost(req.session.aeskey,content), post ])
  res.json({ mssg: 'Post Updated!!' })
})

function decryptAeskey_with_privatekey(privateKey, en_aesKey){
  let priKey = forge.pki.privateKeyFromPem(JSON.parse(privateKey))
  return priKey.decrypt(forge.util.hexToBytes(en_aesKey))
}

function decryptPost_with_aeskey(aesKey, post){
  let decipher = forge.cipher.createDecipher('AES-ECB', aesKey)
  decipher.start()
  decipher.update(forge.util.createBuffer(forge.util.hexToBytes(post)))
  decipher.finish()
  return decipher.output.toString()
}

function encryptPost(aesKey, post){
  let cipher = forge.cipher.createCipher('AES-ECB', aesKey)
  cipher.start()
  cipher.update(forge.util.createBuffer(post))
  cipher.finish()
  return cipher.output.toHex()
}

module.exports = app
