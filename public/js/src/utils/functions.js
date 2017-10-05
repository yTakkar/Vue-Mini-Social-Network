import $ from 'jquery'
import Notify from 'handy-notification'
import { post } from 'axios'

// FUNCTION FOR SHORTENING
const shortener = (elem, length) => {
  let
    parse = parseInt(length),
    len = elem.length
  if (!parse) { return }
  return (len >= parse) ? `${elem.substr(0, length - 2)}..` : (len < parse) ? elem : null
}

// FUNCTION TO TOGGLE
const toggle = el => {
  let style = el.style.display
  style === 'none' ? el.style.display = 'block' : el.style.display = 'none'
}

// FUNCTION FOR COMMON LOGIN
const commonLogin = options => {
  let
    { data, btn, url, redirect, defBtnValue } = options,
    overlay2 = $('.overlay-2')

  btn
    .attr('value', 'Please wait..')
    .addClass('a_disabled')
  overlay2.show()

  post(url, data)
    .then(s => {
      let { data: { mssg, success } } = s
      if (success) {
        Notify({ value: mssg, done: () => location.href = redirect })
        btn.attr('value', 'Redirecting..')
        overlay2.show()
      } else {
        Notify({ value: mssg })
        btn
          .attr('value', defBtnValue)
          .removeClass('a_disabled')
        overlay2.hide()
      }
      btn.blur()
    })
    .catch(e => console.log(e) )
}

// FUNCTION TO CAPITALIZE FIRST LETTER OF A WORD
const c_first = str => {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

// TO REMOVE LINE OF LAST ELEMENT
const llr = () => {
  let
    f = $('.modal_main').children(),
    s = $('.display_content').children().length - 1
  f.eq(s).find('hr').remove()
}

// FUNCTION TO PROFILE'S ACTIONS
const forProfile = async t => {
  let
    {
      username,
      $router,
      $store: { dispatch },
      session: { username: susername }
    } = t,
    { data: valid } = await post('/api/is-user-valid', { username })
  if (!valid){
    $router.push('/error/user')
  } else {
    if (username != susername) {
      post('/api/view-profile', { username })
    }
    dispatch('userDetails', username)
    dispatch('getPosts', username)
    dispatch('getFollowers', username)
    dispatch('getFollowings', username)
    dispatch('getViews', username)
  }
}

// FUNCTION FOR CHECKING IS USER FOLLOWED/UNFOLLOWED
const isFollowing = async username => {
  let { data } = await post('/api/is-following', { username })
  return data
}

// FUNCTION TO RETURN NO OF POSTS
const noOfFollowers = async user => {
  let { data } = await post('/api/no-of-followers', { user })
  return data
}

// FUNCTION TO CHANGE PAGE'S TITLE
const changeTitle = (to, from, next) => {
  let
    { name, meta, params: { username } } = to,
    title

  if (name == 'profile') {
    title = `@${username}`
  } else if (name == 'followers') {
    title = `${username}'s Followers`
  } else if (name == 'followings') {
    title = `${username}'s Followings`
  } else {
    title = meta.title
  }

  document.title = `${title} • Mini Social Network`
  next()
}

// FUNCTION TO FOLLOW
const follow = async options => {
  let
    defaults = {
      user: null,               // USER TO FOLLOW [MUST]
      username: null,           // USER'S USERNAME [MUST]
      update_followers: false,  // PROVIDE WHEN FOLLOWERS ARRAY NEED TO BE UDATED. EG. FOLLOW ACTION ON BANNER COMPONENT
      update_followings: false, // PROVIDE WHEN FOLLOWINGS ARRAY NEED TO BE UDATED. EG. FOLLOWERS/FOLLOWINGS'S FOLLOW COMPONENT
      commit: () => { return }, // PROVIDE WHEN [UPDATE_FOLLOWERS/UPDATE_FOLLOWINGS]=TRUE
      done: () => { return }    // FN TO BE EXECUTED WHEN USER IS FOLLOWED [MUST]
    },
    obj = { ...defaults, ...options },
    {
      user,
      username,
      update_followers,
      update_followings,
      commit,
      done
    } = obj,
    { data } = await post('/api/follow', { user, username }),
    fwing = {
      follow_id: data.follow_id,
      follow_by: $('.data').data('session'),
      follow_by_username: $('.data').data('username'),
      follow_to: user,
      follow_to_username: username,
      follow_time: data.follow_time,
    }

  update_followers ? commit('FOLLOWER', data) : null
  update_followings ? commit('FOLLOWING', fwing) : null

  Notify({ value: `Followed ${username}!!` })
  done()

}

// FUNCTION TO UNFOLLOW
const unfollow = async options => {
  let
    defaults = {
      user: null,                 // USER TO UNFOLLOW [MUST]
      username: null,             // USER'S USERNAME. NEEDED ONLY FOR NOTIFICATION [MUST]
      update_followers: false,    // PROVIDE WHEN FOLLOWERS ARRAY NEED TO BE UDATED. EG. FOLLOW ACTION ON BANNER COMPONENT
      update_followings: false,   // PROVIDE WHEN FOLLOWINGS ARRAY NEED TO BE UDATED. EG. FOLLOWERS/FOLLOWINGS'S FOLLOW COMPONENT
      commit: () => { return },   // PROVIDE WHEN [UPDATE_FOLLOWERS/UPDATE_FOLLOWINGS]=TRUE
      done: () => { return }      // FN TO BE EXECUTED WHEN USER IS UNFOLLOWED [MUST]
    },
    obj = { ...defaults, ...options },
    {
      user,
      username,
      update_followers,
      update_followings,
      commit,
      done,
    } = obj,
    session = $('.data').data('session')

  await post('/api/unfollow', { user })

  update_followers ? commit('UNFOLLOWER', session) : null
  update_followings ? commit('UNFOLLOWING', user) : null

  Notify({ value: `Unfollowed ${username}!!` })
  done()

}

module.exports = {
  shortener,
  toggle,
  commonLogin,
  c_first,
  forProfile,
  isFollowing,
  noOfFollowers,
  changeTitle,
  follow,
  unfollow,
  llr,
}
