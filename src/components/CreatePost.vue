<template>
  <div class="row">
    <div class="col-md-2 p-3">
       <img class="img-container" :src="account.picture" alt="" />
    </div>
    <div class="col-md-8">
        <textarea class="mt-3 bg-light" style="resize: none;" v-model="postText.body" name="post-body" id="post-body" cols="53" rows="5" placeholder="What's on your mind?"></textarea>
    </div>
  </div>
  <div class="row">
    <div class="col-8 text-center" id="photo-icon">
      <span>
        <i class="mdi mdi-image-multiple mdi-24px selectable"> Photo/Video</i>
      </span>
    </div>
    <div class="col-2 ms-auto d-flex align-items-center text-end">
      <span>
          <i class="fab fa-telegram-plane selectable fa-1x" @click="createPost()">  Post</i>
      </span>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { allPostsService } from "../services/AllPostsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { profileService } from "../services/ProfileService"
export default {
  setup(){
    const postText = ref({})
    return {
      async createPost() {
        try {
          await allPostsService.createPost(postText.value)
          document.getElementById('post-body').value = ''
          Pop.toast("Post Created!", 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast("Something is not right!", 'error')
        }
      },
      postText,
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
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
#submit-post {
  background: none;
  border: none;
}

@media screen and (max-width: 600px) {
  #photo-icon {
    text-align: start!important;
  }
}

</style>