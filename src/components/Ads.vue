<template>
  <div class="mt-2">
    <img class="img-fluid" :src="ads.banner" alt="">
  </div>
</template>


<script>
export default {
  props: {ads: {type: Object, required: true}},
  setup(){
    return {}
  }
}
</script>


<style lang="scss" scoped>

</style>