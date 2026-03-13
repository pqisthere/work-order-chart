import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    isAdmin: false,
  }),
  actions: {
    // 只有用户名为 "admin" 时为管理员
    setRole(username) {
      this.isAdmin = username === "admin";
    },
  },
});
