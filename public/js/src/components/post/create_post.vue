<template>

    <div class='create_note modal'>
        <form @submit.prevent='createPost' >

            <div class='c_n_header modal_header'>
                <span class='title'>Create Post</span>
                <Goto />
            </div>

            <div class='c_n_middle modal_middle'>
                <textarea placeholder='Your post..' ref='content' required spellCheck='false' autoComplete='false'></textarea>
                <input type='file' id='photo' ref='photo'/>
            </div>

            <div class='c_n_bottom modal_bottom'>
                <transition name="lock-in">
                    <div class="wrapper" title="Private and encrypted.">
                        <div class="base">
                            <div class="base-bottom">
                            </div>
                            <div class="lock-inside-top">
                            </div>
                            <div class="lock-inside-bottom">
                            </div>
                        </div>
                        <div class="lock-circle">
                            <div class="lock-circle-inside">
                            </div>
                        </div>
                        <div class="lock-box">
                        </div>
                    </div>
                </transition>
                <div style="float:right; position:relative; top:15px;">
                    <a href='#' class='c_n_cancel sec_btn' @click.prevent='Back' >Back</a>
                    <input type='submit' class='c_n_add pri_btn' value='Add Post' />
                </div>
            </div>

        </form>
    </div>

</template>

<script>
import $ from 'jquery'
import Notify from 'handy-notification'
import UserMixin from '../../mixins/user-mixin'
import db from '../firebaseInit'
import uuid from 'uuid'

export default {
    mixins: [ UserMixin ],
    methods: {
        Back () {
            history.back()
        },
        createPost: async function() {

            let imgId = '', file = document.getElementById('photo').files[0];
            if (file !== undefined){
                imgId = uuid() + '.jpg';
                await db.ref().child('images/' + imgId).put(file).then(function (snapshot) {
                    console.log('Uploaded a blob or file!')
                });
            }

            let {
                $refs: { title, content },
                $http,
                $store: { commit }
            } = this
            let { body } = await $http.post('/api/create-post', {
                title: title.value,
                content: content.value,
                img_id: imgId,
            })
            Notify({
                value: 'Post Created!!',
                done: () => this.Back()
            })
            commit('ADD_POST', body)
        },
    },
    created(){
        let {
            session: { username },
            $route: { params },
            $router,
        } = this
        username != params.username ? $router.push('/error')  : null
    },
    mounted(){
        $('.cp_title').focus()
    }
}
</script>

<style>
    .lock-in-enter{
        animation: unlock-circle .5s;
        animation: unlock-box .5s;
    }

    .lock-in-leave{
        animation: unlock-circle .5s reverse;
        animation: unlock-box .5s reverse;

    }

    @keyframes unlock-circle {
        0% {
            bottom: 45px;
        }
        25% {
            bottom: 45px;
        }
        50% {
            bottom: 30px;
        }
        75% {
            bottom: 30px;
        }
        100% {
            bottom: 30px;
        }
    }

    @keyframes unlock-box {
        0% {
            bottom: 65px;
        }
        25% {
            bottom: 65px;
        }
        50% {
            bottom: 50px;
        }
        75% {
            bottom: 50px;
        }
        100% {
            bottom: 50px;
        }
    }

    .wrapper {
        position: relative;
        float: left;
        left: 20px;
        height: 70px;
        bottom: 5px;
    }

    .wrapper[title]:hover:after {
      content: attr(title);
      text-align: left;
      background-color: #3D464D;
      color:white;
      padding:10px;
      border-radius: 10px;
      position: absolute;
      left:-100%;
      width:auto;
    }

    .base {
        background-color: #ecf0f1;
        width: 45px;
        height: 36px;
        border-radius: 12px;
        margin: 0 auto;
        position: relative;
        top: 25px;
        z-index: 100;
        animation-name: base-color;
        animation-duration: 2s;
        animation-iteration-count: 1;
        animation-play-state: running;
    }

    .base-bottom {
        background-color: #bdc3c7;
        width: 45px;
        height: 19px;
        border-radius: 0 0 12px 12px;
        top: 19px;
        position: relative;
        opacity: 0.4;
        animation-name: base-color;
        animation-duration: 2s;
        animation-iteration-count: 1;
        animation-play-state: running;
    }

    .lock-circle {
        height: 45px;
        width: 22px;
        border-radius: 45px;
        z-index: 10;
        background-color: #bdc3c7;
        position: relative;
        margin: 0 auto;
        bottom: 30px;
        /* border:solid black 1px; */
        animation-name: unlock-circle;
        animation-duration: 2s;
        animation-iteration-count: 1;
        animation-play-state: running;
    }

    .lock-circle-inside {
        height: 45px;
        width: 13px;
        border-radius: 30px;
        z-index: 20;
        background-color: white; /*should be same as background color*/
        position: relative;
        /* border:solid black 1px; */
        margin: 0 auto;
        top: 10px;
    }

    .lock-box {
        animation-name: unlock-box;
        animation-duration: 2s;
        animation-iteration-count: 1;
        animation-play-state: running;
        position: relative;
        height: 10px;
        width: 10px;
        background-color: white; /*should be same as background color*/
        bottom:35px;
        left: 25px;
        z-index: 80;
        /* border:solid black 1px; */
    }

    .lock-inside-top {
        width: 10px;
        height: 10px;
        border-radius: 50px;
        background-color: black;
        z-index: 300;
        position: relative;
        bottom: 10px;
        left: 17.5px;
    }

    .lock-inside-bottom {
        width: 7px;
        height: 15px;
        background-color: black;
        z-index: 300;
        position: relative;
        bottom: 12px;
        left: 19px;
    }
</style>
