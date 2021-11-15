<template>
  <div class="edit-prof">
    <form class="input-group" action="" @submit.prevent="editProf()">
      <div class="offcanvas offcanvas-start" tabindex="-1" id="editprof" aria-labelledby="editprof">
        <div class="offcanvas-header">
          <h4 class="offcanvas-title" id="offcanvasWithBackdropLabel">Edit Your Profile..</h4>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body container-fluid">
          <b>General Info:</b>
          <input v-model="editable.name" class="form-control mt-3" type="text" placeholder="Profile Name.." name="" id="">
          <input v-model="editable.class" class="form-control mt-3" type="text" placeholder="ex. Class of 2014" name="" id="">
          <input v-model="editable.bio" class="form-control mt-3" type="text" placeholder="Tell us about yourself.." name="" id="">
          <div v-if="!profile.gradutated" class="d-flex justify-content-start align-items-center">
            <input v-model="editable.graduated" class="form-check-input mt-3" type="checkbox" name="" id="chkbx">
            <label class="mt-3 ms-3" for="chkbx">Check if you've graduated.</label>
          </div>
          <input v-model="editable.picture" class="form-control mt-3" type="text" placeholder="Put a profile image link here.." name="" id="">
          <input v-model="editable.coverImg" class="form-control mt-3 mb-3" type="text" placeholder="Put a cover image link here.." name="" id="">
          <b>Socials:</b>
          <input v-model="editable.github" class="form-control mt-3" type="text" placeholder="Put your Github link here.." name="" id="">
          <input v-model="editable.linkedin" class="form-control mt-3" type="text" placeholder="Put your Linkedin link here.." name="" id="">
          <input v-model="editable.resume" class="form-control mt-3" type="text" placeholder="Put your resume link here.." name="" id="">
          <button class="btn rounded btn-primary mt-3" type="submit" data-bs-dismiss="offcanvas">Update</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { profileService } from "../services/ProfileService"
export default {
  setup(){
    const editable = ref({})
    return {
      async editProf() {
        try {
          await profileService.editProf(editable.value)
        } catch (error) {
          logger.error(error)
          Pop.toast("Something went wrong!", 'error')
        }
      },

      profile: computed(() => AppState.profile),
      account: computed(() => AppState.account),
      editable,
    }
  }
}
</script>


<style lang="scss" scoped>

</style>