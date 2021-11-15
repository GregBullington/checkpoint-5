<template>
  <div class="row">
    <div class="col">
      <div v-if="post.creatorId === account.id" class="row justify-content-end">
        <div class="col-md-2 text-end dropdown">
          <i class="mdi mdi-dots-horizontal mdi-24px selectable dropdown-toggle" data-bs-toggle="dropdown"></i>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item selectable" @click="removePost(post.id)">Delete</a>
            </li>
          </ul>
        </div>
      </div>
     <div class="row">
      <div class="col-md-2 p-2 d-flex justify-content-center">
        <img class="img-container selectable" :src="post.creator.picture" alt="creatorPicture" @click="creatorProfile(post.creatorId)">
      </div>
      <div class="col-md-10 p-0">
        <div class="row mt-3">
          <div class="col" id="post-creator-info">
          <b @click="creatorProfile(post.creatorId)" class="user-font-size selectable">{{post.creator.name}}</b>
          </div>
        </div>
        <div class="row">
          <span class="col text-dark" id="post-creator-info">
            {{post.creator.updatedAt}} 
            <i class="ms-2 fas fa-user-graduate"></i>
          </span>
        </div>
      </div>
     </div>
     <div class="row">
       <div class="col mt-3 ms-3">
        {{post.body}}
       </div>
     </div>
     <div class="row justify-content-center m-0 p-0">
       <div class="col-md-10 d-flex justify-content-center mt-3">
         <img class="img-fluid" :src="post.imgUrl" alt="">
       </div>
      </div>
     <div class="row justify-content-end m-0 p-0">
       <div class="col-2 text-end">
         <i class="mdi mdi-heart-outline mdi-24px selectable" v-if="account.id" @click="likePost(post.id)">{{post.likes.length}}</i>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { allPostsService } from "../services/AllPostsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { useRouter } from "vue-router"


export default {
  props: {post: {type: Object, reqired: true}},
  setup(props){
    const router = useRouter()
      return {
      async removePost(id) {
       try {
         await allPostsService.removePost(id)
       } catch (error) {
        logger.error(error)
        Pop.toast("Something is not right!", 'error')
       }
     },
     async likePost(id) {
       try {
         await allPostsService.likePost(id)
       } catch (error) {
         logger.error(error)
         Pop.toast("Something is not right", 'error')
       }
     },
     async creatorProfile(id) {
       router.push({name: "Profile", params: {id: id}})
     },
      posts: computed (() => AppState.allPosts),
      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
   }
  }
}
</script>


<style lang="scss" scoped>
.img-container {
  display: inline-block;
  width: 75px;
  height: 75px;
  border-radius: 50%;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.user-font-size {
  font-size: 20px;
}

@media screen and (max-width: 600px) {
  #post-creator-info {
    text-align: center;
  }
}

</style>