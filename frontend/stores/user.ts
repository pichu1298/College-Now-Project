import { defineStore } from "pinia";
export const useUserStore = defineStore("store", {
  state: () => ({
    user: null,
  }),
  actions: {
    loginUser(username: string, password: string) {
      this.user = { username };
    },
  },
});
