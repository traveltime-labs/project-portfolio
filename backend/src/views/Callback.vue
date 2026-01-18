<template>
    <div>
      <h1>Google Callback</h1>
      <pre>{{ tokenInfo }}</pre>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from "vue";
  
  const tokenInfo = ref<any>(null);
  
  onMounted(() => {
    // Google redirect 回來會帶 access_token 在 URL fragment
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
  
    if (accessToken) {
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          tokenInfo.value = data;
          location.href='/OtherLogin'
        });
    }
  });
  </script>
  