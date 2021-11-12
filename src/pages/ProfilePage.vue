<template>
  <div class="profile container-fluid text-center">
    <div class="row">
      <div class="col-4 bg-primary elevation-2 ms-2">
        <h1>{{ profile.name }}</h1>
        <img class="rounded" :src="profile.picture" alt="" />
        <p>{{ profile.email }}</p>
      </div>
    </div>
    <!-- <CreatePost v-if="account.id == profile.id" /> -->
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
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    }
  }
}
</script>


<style lang="scss" scoped>

</style>