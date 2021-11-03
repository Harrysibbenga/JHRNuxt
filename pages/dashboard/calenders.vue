<template>
  <div>
    <div class="container">
      <b-nav tabs class="pt-3">
        <b-nav-item to="/dashboard/calendars/">GB3 Calendar</b-nav-item>
        <b-nav-item to="/dashboard/calendars/gb4">GB4 Calendar</b-nav-item>
        <b-nav-item to="/dashboard/calendars/f3uae">F3 UAE Calendar</b-nav-item>
        <b-nav-item to="/dashboard/calendars/f4uae">F4 UAE Calendar</b-nav-item>
      </b-nav>
    </div>
    <router-view class="pt-3"></router-view>
  </div>
</template>
