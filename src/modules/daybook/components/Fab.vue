<template>
<button  class="btn btn-primary"
         @click="$emit('on:click')">
  <i class="fa fa-2x"
     :class="icon"
  ></i>
</button>
</template>

<script>
export default {
  name: "Fab",
  props: {
    icon: {
      type: String,
      default: 'fa-plus'
    }
  }
}
</script>

<style lang="scss" scoped>
button{
  border-radius: 100%;
  bottom: 2rem;
  height: 4rem;
  position: fixed;
  right: 2rem;
  width: 4rem;
}
</style>
