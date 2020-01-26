<template>
  <div class="main-tabs">
    <span class="left">2 items left</span>
    <span class="tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[ 'state', filter === state ? 'current' : '' ]"
        @click="filterTodo(state)"
      >
        {{ state }}
      </span>
    </span>
    <span class="clear" @click="clearAllCompleted">clear Completed</span>
  </div>
</template>

<script>
  export default {
    props: {
      filter: {
        type: String,
        required: true
      },
      filterTodo: {
        type: Function,
        required: true
      },
      clearAllCompleted: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        states: [ 'all', 'active', 'completed' ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .main-tabs {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    padding: 12px 0;
    line-height: 30px;
    background-color: #fff;
    .left, .clear {
      color: #666;
      padding: 0 10px;
      cursor: pointer;
    }
    .tabs {
      width: 200px;
      display: flex;
      justify-content: space-between;
      .state {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
        border: 1px solid rgba(175,47,47,0);
        color: #666;
        &.current {
          border-color: rgba(175,47,47,0.4);
          border-radius: 5px;
        }
      }
    }
  }
</style>
