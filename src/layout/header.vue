<template>
  <div :class="$style.mainHeader">
    <h1 :class="$style.title">Vue Todo</h1>
  </div>
</template>

<script>
  export default {
    created () {
    }
  }
</script>

<style lang="less" module>
  .main-header {
    .title {
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      color: antiquewhite;
    }
  }
</style>
