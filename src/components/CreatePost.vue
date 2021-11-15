<template>
  <div class="row">
    <div class="col-md-2 p-3">
       <img class="img-container" :src="account.picture" alt="" />
    </div>
    <div class="col-md-8">
      <textarea class="mt-3" style="resize: none;" v-model="postText.body" name="post-body" id="" cols="53" rows="5" placeholder="What's on your mind?"></textarea>
    </div>
  </div>

    <div class="row">
      <div class="col text-end">
        <span class="me-5">
          <i class="mdi mdi-image-outline mdi-24px selectable"></i>
        </span>
        <span>
          <i class="mdi mdi-send-outline mdi-24px selectable me-1" @click="createPost()"></i>
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

</style>