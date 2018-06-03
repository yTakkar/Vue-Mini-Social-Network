// ROUTES FOR PROFILE PAGE

import Profile from '../components/profile/profile.vue'
import CreatePost from '../components/post/create_post.vue'
import Overlay from '../components/others/overlay.vue'
import Followers from '../components/follow/followers.vue'
import Followings from '../components/follow/followings.vue'
import ConfirmFollowers from '../components/follow/confirmFollowers.vue'
import DeleteFollowers from '../components/follow/deleteFollowers.vue'

export default {
  path: '/profile/:username',
  name: 'profile',
  component: Profile,
  children: [
    {
      path: 'create-post',
      name: 'create-post',
      components: {
        'create-post': CreatePost,
        'overlay': Overlay
      },
      meta: { title: 'Create Post' }
    },
    {
      path: 'confirm-followers',
      name: 'confirm-followers',
      components: {
        'confirm-followers': ConfirmFollowers,
        'overlay': Overlay
      },
      meta: { title: 'Confirm Followers' }
    },
    {
      path: 'delete-followers',
      name: 'delete-followers',
      components: {
        'delete-followers': DeleteFollowers,
        'overlay': Overlay
      },
      meta: { title: 'Delete Followers' }
    },
    {
      path: 'followers',
      name: 'followers',
      components: {
        'followers': Followers,
        'overlay': Overlay
      }
    },
    {
      path: 'followings',
      name: 'followings',
      components: {
        'followings': Followings,
        'overlay': Overlay
      }
    }
  ]
}
