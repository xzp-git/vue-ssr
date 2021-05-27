<template>
  <div id="app">
      <router-link to="/">foo</router-link>
      <router-link to="/bar">bar</router-link>
      <router-view></router-view>
      <h1>{{$store.state.name}}</h1>
      <button @click="$store.dispatch('changeName')">++++</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>