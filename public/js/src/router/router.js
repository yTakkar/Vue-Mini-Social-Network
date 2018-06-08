// ROUTES

import profile from './profile-router'
import {
  home,
  explore,
  error,
  viewPost,
  editProfile,
  dataPage,
  deactivate,
  notFound,
  createAd
} from './rest-router'

export default [
  home,
  explore,
  profile,
  error,
  viewPost,
  editProfile,
  dataPage,
  deactivate,
  notFound,
  createAd
]
