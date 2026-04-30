import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  function login(username: string, password: string) {
    user.value = { username, password };
  }

  return {
    user,
    login,
  };
});
