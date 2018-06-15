// ALL THE OTHER ROUTES

import Home from '../components/home/home.vue'
import Explore from '../components/explore/explore.vue'
import Error from '../components/error/error.vue'
import ViewPost from '../components/post/view-post.vue'
import Likes from '../components/post/likes.vue'
import Overlay from '../components/others/overlay.vue'
import EditProfile from '../components/edit_profile/edit_profile.vue'
import DataPage from '../components/data_page/data_page.vue'
import Deactivate from '../components/deactivate/deavtivate.vue'
import CreatePost from '../components/post/create_post.vue'
import PublishAds from '../components/ads/publish.vue'

export const home = {
  path: '/',
  component: Home,
  meta: { title: 'Home' },
  children: [
    {
      path: 'create-post-home',
      name: 'create-post-home',
      components: {
        'create-post-home': CreatePost,
        'overlay': Overlay,
      },
      meta: { title: 'Create Post' }
    }]
}

export const explore = {
  path: '/explore',
  component: Explore,
  meta: { title: 'Explore' }
}

export const error =  {
  path: '/error/:what',
  name: 'error',
  component: Error,
  meta: { title: 'Oops!! Error' }
}

export const viewPost = {
  path: '/view-post/:post',
  name: 'view-post',
  component: ViewPost,
  meta: { title: 'View Post' },
  children: [
    {
      path: 'likes',
      name: 'likes',
      components: {
        'likes': Likes,
        'overlay': Overlay,
      },
      meta: { title: 'Likes' }
    }
  ]
}

export const editProfile = {
  path: '/edit-profile',
  name: 'edit-profile',
  component: EditProfile,
  meta: { title: 'Edit Profile' }
}

export const dataPage = {
  path: '/data-page',
  name: 'data-page',
  component: DataPage,
  meta: { title: 'Data Page' }
}

export const deactivate = {
  path: '/deactivate',
  name: 'deactivate',
  component: Deactivate,
  meta: { title: 'Deactivate your account' }
}

export const createAd = {
  path: '/publish',
  name: 'publish',
  component: PublishAds,
  meta: { title: 'Ads on SpeakEasy'}
}

export const notFound = {
  path: '*',
  component: Error,
  meta: { title: 'Oops!! Error' }
}
