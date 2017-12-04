import $ from 'jquery'
import Notify from 'handy-notification'
import { commonLogin } from '../utils/functions'

// User signup
$('form.form_register').submit(e => {
  e.preventDefault()

  let
    username = $('.r_username').val(),
    email = $('.r_email').val(),
    password = $('.r_password').val(),
    password_again = $('.r_password_again').val()

  if (!username || !email || !password || !password_again) {
    Notify({ value: 'Values are missing!!' })
  } else if (password != password_again) {
    Notify({ value: 'Passwords don\'t match!!' })
  } else {

    let signupOpt = {
      data: {
        username,
        email,
        password,
        password_again
      },
      btn: $('.r_submit'),
      url: '/user/signup',
      redirect: '/',
      defBtnValue: 'Signup for free',
    }
    commonLogin(signupOpt)

  }

})

// User login
$('form.form_login').submit(e => {
  e.preventDefault()

  let
    username = $('.l_username').val(),
    password = $('.l_password').val()

  if (!username || !password) {
    Notify({ value: 'Values are missing!!' })
  } else {

    let loginOpt = {
      data: {
        username: $('.l_username').val(),
        password: $('.l_password').val()
      },
      btn: $('.l_submit'),
      url: '/user/login',
      redirect: '/',
      defBtnValue: 'Login to continue',
    }
    commonLogin(loginOpt)

  }

})
