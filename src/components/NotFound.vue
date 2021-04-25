<template>
  <h2>{{ $route.fullPath }}</h2>
  <h2>404 not found.</h2>
  <router-view></router-view>
</template>

<script>
export default {
  name: "NotFound",
};
</script>
