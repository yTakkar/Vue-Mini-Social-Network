// SOME HELPER FUNCTIONS

const
  db = require('./mysql'),
  bcrypt = require('bcrypt-nodejs')

/**
 * Query MySQL as a promise
 * @param {String} q MySQL Query
 * @param {Object} data Data needed by the query
 * @returns {<Promise>} Promise
 */
const query = (q, data) => {
  return new Promise((resolve, reject) => {
    db.query(q, data, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

/**
 * creates a new user
 * @param {Object} User User details
 */
const create_user = user => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, null, null, (error, hash) => {
      user.password = hash
      db.query('INSERT INTO users SET ?', user, (err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  })
}

/**
 * compares password
 * @param {String} password Password
 * @param {String} hash Hash to be compared with password
 * @returns {Boolean} Boolean
 */
const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      err ? reject(err) : resolve(res)
    })
  })
}

/**
 * Returns ID from user
 * @param {String} username Username
 * @returns {Number} ID
 */
const getId = username => {
  return new Promise((resolve, reject) => {
    query('SELECT id FROM users WHERE username=? LIMIT 1', [username])
      .then(s => resolve(s[0].id))
      .catch(e => reject(e))
  })
}

/**
 * Returns whether session is following user
 * @param {Number} session Session ID
 * @param {Number} user User
 * @returns {Boolean} Boolean
 */
const isFollowing = (session, user) => {
  return new Promise((resolve, reject) => {
    query('SELECT COUNT(follow_id) AS is_following FROM follow_system WHERE follow_by=? AND follow_to=? LIMIT 1', [session, user])
      .then(is => resolve((is[0].is_following == 1) ? true : false))
      .catch(e => reject(e))
  })
}

module.exports = {
  query,
  create_user,
  comparePassword,
  getId,
  isFollowing,
}
