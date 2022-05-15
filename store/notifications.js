import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("Notifications", {
  state: () => ({
    message: null,
    category: null,
    fields: { input: {} },
  }),
});

