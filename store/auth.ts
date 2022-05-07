import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore({
  id: 'auth',

  state: () => ({
    isAuthenticated: false,
    token: '',
    roles: [],
    permissions: [],
    location: 'vn',
    me: null,
    counter: 10,
  }),

  getters: {
    getUser: (state) => state.me,
    getCount: (state) => state.counter,
  },

  actions: {
    // async loginHandle(email: string, password: string) {
    // const { login } = ( await cmsClient.mutate({
    //     mutation: LOGIN_MUTATION,
    //     variables: {
    //       email: email,
    //       password: password
    //     }
    //   })
    // ).data;
    // if (login.token === null) {
    //   return {
    //     isAuthenticated: false,
    //     message: login.message
    //   };
    // } else {
    //   // const res = await this.setAuthToken(login.token);
    //   // if (res) {
    //   //   this.isAuthenticated = true;
    //   // }
    //   // return {
    //   //   isAuthenticated: true,
    //   // }
    // }
    // },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
