<template>
  <div>
    <div class="container">
      <b-nav tabs class="pt-3">
        <b-nav-item to="/dashboard/gallery/">All Images</b-nav-item>
        <b-nav-item to="/dashboard/gallery/videos">Videos</b-nav-item>
        <b-nav-item to="/dashboard/gallery/circuits">Circuits</b-nav-item>
      </b-nav>
    </div>
    <router-view class="pt-3"></router-view>
  </div>
</template>
