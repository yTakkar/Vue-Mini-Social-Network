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
]
