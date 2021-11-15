<template>
<div class="container-fluid">
  <div class="row justify-content-center">
    <div v-for="a in ads" :key="a.title" class="col-md-5">
      <Ads :ads= "a" />
    </div>
  </div>
  <div v-if="account.id" class="row justify-content-center">
    <div class="col-md-6 card elevation-2 m-3">
      <CreatePost />
    </div>
  </div>
  <div class="row align-items-center container-fluid flex-column m-0 p-0">
    <div v-for="p in allPosts" :key="p.id" class="col-md-6 card  elevation-3 mt-4 d-flex justify-content-center">
      <Post :post= "p" />
    </div>
  </div>
</div>
</template>

<script>
import { adsService } from "../services/AdsService"
import { allPostsService } from "../services/AllPostsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { computed, onMounted, ref } from "@vue/runtime-core"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await allPostsService.getAllPosts()
      } catch (error) {
        logger.error(error)
        Pop.toast("Something went wrong", 'error')
      }
      try {
        await adsService.getAds()
      } catch (error) {
        logger.error(error)
        Pop.toast("Something went wrong", 'error')
      } 
    })
    return {
      allPosts: computed(() => AppState.allPosts),
      account: computed(() => AppState.account),
      ads: computed(() => AppState.ads)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card{
    width: 50vw;
    > img{
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
