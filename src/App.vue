<template>
  <div id="app">
    <div class="container">
      <div class="navbar d-flex">
        <div class="navbar__header pt-1">
          <h1><b>Dr Q. Song's Homepage</b></h1>
        </div>
        <!-- <div class="navbar__nav align-self-end"> -->
        <div class="navbar__nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/albums">Albums</router-link> |
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/global";
</style>
