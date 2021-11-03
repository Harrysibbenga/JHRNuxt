<template>
  <div>
    <div class="container">
      <b-nav tabs class="pt-3">
       <b-nav-item to="/dashboard/pages/">About</b-nav-item>
        <b-nav-item to="/dashboard/pages/simulator">Simulator</b-nav-item>
        <b-nav-item to="/dashboard/pages/gb3">GB3</b-nav-item>
        <b-nav-item to="/dashboard/pages/gb4">GB4</b-nav-item>
        <b-nav-item to="/dashboard/pages/f3uae">F3 UAE</b-nav-item>
        <b-nav-item to="/dashboard/pages/f4uae">F4 UAE</b-nav-item>
      </b-nav>
    </div>
    <nuxt-child class="pt-3"></nuxt-child>
  </div>
</template>
