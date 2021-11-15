<template>
  <div class="profile container-fluid text-center">
    <div class="row justify-content-center">
      <div class="col-md-10 card p-0 mt-3 d-flex justify-content-center container-fluid" id="cover-img-div">
        <img class="img-fluid cover-image" :src="profile.coverImg" alt="">
      </div>
      <div class="col-md-10 card bg-light elevation-2">
        <div class="row justify-content-start">
          <div class="col-md-2 fa-stack fa-2x">
            <img class="mt-2 prof-img-container" :src="profile.picture" alt="" />
              <i class="fas fa-circle fa-stack-2x icon-color move-icon" id="graduate-icon"></i>
              <i class="fas fa-user-graduate fa-stack-1x move-icon text-dark" id="graduate-icon"></i>
          </div>
          <div class="col-md-9 text-end mt-2" id="social-icons">
            <a href=""><i class="mdi mdi-github mdi-48px ms-2 text-dark"></i></a>
            <a href=""><i class="mdi mdi-linkedin mdi-48px ms-2 text-dark"></i></a>
            <a href=""><i class="mdi mdi-file-account mdi-48px ms-2 text-dark"></i></a>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 mt-5 ms-1 title-font" id="prof-class">
          <p style="font-size: 23px;">
            {{profile.class}}Class of 2014
          </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 text-start ms-2 title-font" id="prof-name">
            <h2>{{ profile.name }}</h2>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8 fst-italic">
            <p>{{profile.bio}} Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos asperiores tempora omnis molestias est harum expedita porro facilis alias. Harum non consequatur saepe deleniti iusto dolore maxime molestiae vel optio.</p>
          </div>
        </div>
        <div class="row justify-content-end" id="edit">
          <div class="col-3 m-4" id="edit-div">
            <button class="btn btn-outline-primary rounded px-4">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  <div v-if="account.id" class="row justify-content-center">
    <div class="col-md-6 card bg-light elevation-2 m-2">
      <CreatePost v-if="account.id == profile.id" />
    </div>
  </div>
  </div>
  <div class="row align-items-center container-fluid flex-column m-0 p-0">
    <div v-for="p in allPosts" :key="p.id" class="col-md-6 card bg-light  elevation-3 mt-4 d-flex justify-content-center">
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
.cover-image {
  object-fit: cover;
  max-height: 200px;
}
.img-container {
  display: inline-block;
  width: 75px;
  height: 75px;
  border-radius: 50%;

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.prof-img-container {
  display: inline-block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  outline: #3ba5dc solid 3px;
  transform: translateY(-85px);

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.icon-color {
    color: #d8d8d8;
    text-shadow:
    -1px -1px 0 #3ba5dc,
    1px -1px 0 #3ba5dc,
    -1px 1px 0 #3ba5dc,
    1px 1px 0 #3ba5dc;
}
.move-icon {
  transform:translate(60px, 15px);
}

@media screen and (max-width: 600px) {
  #social-icons {
    text-align: center!important;
  }
  #prof-name {
    text-align: center!important;
  }
  #prof-class {
    margin-top: 0!important;
  }
  #edit {
    justify-content: center!important;
  }
  #cover-img-div {
    margin: 0!important;
  }
  #graduate-icon {
    transform: translate(65px, 15px);
  }
}


</style>