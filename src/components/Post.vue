<template>
  <div class="row">
    <div class="col p-3">
      <img class="img-container" :src="post.creator.picture" alt="creatorPicture">
      <b class="ms-3 user-font-size">{{post.creator.name}}</b>
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
        <i class="mdi mdi-heart-outline mdi-24px">0</i>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {post: {type: Object, reqired: true}},
  setup(props){
    return {
      posts: computed (() => AppState.allPosts),
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


</style>