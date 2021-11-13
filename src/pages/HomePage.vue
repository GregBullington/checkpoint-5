<template>
<div class="row justify-content-center">
  <div class="col-md-8 mt-2">
    <Search />
  </div>
  <div class="col-md-6 card sticky-top elevation-2 mt-2">
    <div>
      <!--post form FIXME -->
    </div>
  </div>
</div>
  <div class="row align-items-center container-fluid flex-column m-0 p-0">
    <div v-for="p in allPosts" :key="p.id" class="col-md-6 card selectable elevation-3 mt-4 d-flex justify-content-center">
      <Post :post="p" />
    </div>
  </div>
</template>

<script>
import { allPostsService } from "../services/AllPostsService"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { AppState } from "../AppState"
import { computed, onMounted } from "@vue/runtime-core"
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
    })
    return {
      allPosts: computed(() => AppState.allPosts)
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
