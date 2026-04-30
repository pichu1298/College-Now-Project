<template>
  <div>
    <h1>This is index</h1>
    <input type="text" name="" id="" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user";
const userStore = useUserStore();

async function loginUser() {
  const user = {
    username: "testuser",
    password: "password123",
  };
  userStore.login(user);
}

onMounted(() => {
  loginUser();
});
</script>
