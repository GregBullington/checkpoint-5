<template>
  <div class="profile container-fluid text-center">
    <div class="row">
      <div class="col-4 bg-primary elevation-2 ms-2">
        <h1>{{ profile.name }}</h1>
        <img class="mb-2 rounded" :src="profile.picture" alt="" />
      </div>
    </div>
  </div>
  <div v-if="account.id" class="row justify-content-center">
    <div class="col-md-6 card elevation-2 m-2">
      <CreatePost v-if="account.id == profile.id" />
    </div>
  </div>
  <div class="row align-items-center container-fluid flex-column m-0 p-0">
    <div v-for="p in allPosts" :key="p.id" class="col-md-6 card  elevation-3 mt-4 d-flex justify-content-center">
      <Post :post="p" />
    </div>
  </div>
</template>


<script>
import { profileService } from "../services/ProfileService"
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { allPostsService } from "../services/AllPostsService";
import { AppState } from "../AppState";
export default {
  name: 'Profile',
  setup(){
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profileService.getProfile(route.params.id)
          await allPostsService.getAllPosts("?creatorId=" + route.params.id)
        }
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, "error")
      }
    })
    return {
      allPosts: computed(() => AppState.allPosts),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>