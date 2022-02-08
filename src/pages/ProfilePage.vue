<template>
  <div class="profile container-fluid text-center">
    <div class="row justify-content-center">
      <div
        class="
          col-md-10
          card
          p-0
          mt-3
          d-flex
          justify-content-center
          container-fluid
        "
        id="cover-img-div"
      >
        <img class="img-fluid cover-image" :src="profile.coverImg" alt="" />
      </div>
      <div class="col-md-10 card bg-light elevation-2">
        <div class="row justify-content-start">
          <div class="col-md-2 fa-stack fa-2x">
            <img
              class="mt-2 prof-img-container"
              :src="profile.picture"
              alt=""
            />
            <span v-show="profile.graduated">
              <i
                class="fas fa-circle fa-stack-2x icon-color move-icon"
                id="graduate-icon"
              ></i>
              <i
                class="fas fa-user-graduate fa-stack-1x move-icon text-dark"
                id="graduate-icon"
              ></i>
            </span>
          </div>
          <div class="col-md-9 text-end mt-2" id="social-icons">
            <a :href="profile.github"
              ><i class="mdi mdi-github mdi-48px ms-2 text-dark"></i
            ></a>
            <a :href="profile.kinked"
              ><i class="mdi mdi-linkedin mdi-48px ms-2 text-dark"></i
            ></a>
            <a :href="profile.resume"
              ><i class="mdi mdi-file-account mdi-48px ms-2 text-dark"></i
            ></a>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8 text-start ms-5 title-font mt-2" id="prof-name">
            <h2>{{ profile.name }}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-2 mt-1" id="prof-class">
            <p>
              {{ profile.class }}
            </p>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-8 fst-italic">
            <p>{{ profile.bio }}</p>
          </div>
        </div>
        <div
          v-if="profile.id === account.id"
          class="row justify-content-end"
          id="edit"
        >
          <div class="col-3 m-4" id="edit-div">
            <button
              class="btn btn-outline-primary rounded px-4"
              data-bs-toggle="offcanvas"
              href="#editprof"
            >
              Edit
            </button>
          </div>
        </div>
        <EditProf />
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-for="a in ads" :key="a.title" class="col-md-5 p-0">
        <Ads :ads="a" />
      </div>
    </div>
    <div v-if="account.id" class="row justify-content-center">
      <div
        v-if="account.id == profile.id"
        class="col-md-8 card bg-light elevation-2 m-2"
      >
        <CreatePost />
      </div>
    </div>
  </div>
  <div class="row align-items-center container-fluid flex-column m-0 p-0">
    <div
      v-for="p in allPosts"
      :key="p.id"
      class="
        col-md-6
        card
        bg-light
        elevation-3
        mt-4
        d-flex
        justify-content-center
      "
    >
      <Post :post="p" />
    </div>
  </div>
  <div class="m-2" v-if="pages > 0">
    <button
      class="btn me-1 text-white selectable"
      :class="{
        'btn-primary': page === currentPage,
        'btn-dark': page !== currentPage,
      }"
      :disabled="page === currentPage"
      v-for="page in pages"
      :key="page"
      @click="getPage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>


<script>
import { profileService } from "../services/ProfileService";
import { computed, watchEffect } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { allPostsService } from "../services/AllPostsService";
import { AppState } from "../AppState";
import { adsService } from "../services/AdsService";
export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profileService.getProfile(route.params.id);
          await allPostsService.getAllPosts("?creatorId=" + route.params.id);
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
      try {
        await adsService.getAds();
      } catch (error) {
        logger.error(error);
        Pop.toast("Something went wrong", "error");
      }
    });
    return {
      allPosts: computed(() => AppState.allPosts),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
      pages: computed(() => AppState.pages),
      currentPage: computed(() => AppState.currentPage),
      ads: computed(() => AppState.ads),

      async getPage(page) {
        try {
          await allPostsService.getAllPosts("?page=" + page);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
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
  text-shadow: -1px -1px 0 #3ba5dc, 1px -1px 0 #3ba5dc, -1px 1px 0 #3ba5dc,
    1px 1px 0 #3ba5dc;
}
.move-icon {
  transform: translate(60px, 15px);
}

@media screen and (max-width: 600px) {
  #social-icons {
    text-align: center !important;
  }
  #prof-name {
    text-align: center !important;
  }
  #prof-class {
    margin-top: 0 !important;
  }
  #edit {
    justify-content: center !important;
  }
  #cover-img-div {
    margin: 0 !important;
  }
  #graduate-icon {
    transform: translate(65px, 15px);
  }
}
</style>