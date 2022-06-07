import { defineStore } from "pinia";

interface INotification {
  message: any[]
}


export const useNotificationsStore = defineStore("Notifications", {
  state: ():INotification => ({
    message: []
  }),

  actions: {
    setMessages (val:any) {
      this.message.push(val)
    },
  }


});

