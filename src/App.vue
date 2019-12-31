<template>
  <div id="app">
    <div class="navbar">
      <h1><b>Dr Q. Song's Homepage</b></h1>
      <div class="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/albums">Albums</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/global";
</style>
