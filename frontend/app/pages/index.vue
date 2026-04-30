<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
        This is index
      </h1>

      <div class="space-y-4">
        <input
          type="text"
          name="username"
          id="username"
          v-model="user.username"
          placeholder="Username"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
          placeholder="Password"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        @click="loginUser"
        class="w-full mt-6 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore();

const user = reactive({
  username: "",
  password: "",
});

async function loginUser() {
  userStore.login(user.username, user.password);
}

onMounted(() => {
  loginUser();
});
</script>
