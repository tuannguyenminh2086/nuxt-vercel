import { defineStore, acceptHMRUpdate } from 'pinia'
import { LOGIN_MUTATION } from '~~/graphql/mutations/authMutation';
import cmsClient from '~~/apollo/cmsClient';

export const useAuthStore = defineStore({
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


  actions: {
    async loginHandle(_email: string, _password: string) {

      const { login } = ( await cmsClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: _email,
          password: _password
        }
      })
      ).data;

      if (login) {
        this.isAuthenticated = true
      }


      // const { mutate: login, onDone } = useMutation(LOGIN_MUTATION)

      // login({
      //   email, password
      // })

      // onDone(result => {
      //   console.log(result.data)
      // })

      // const { login } = ( await DefaultApolloClient.mutate({
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
    },

  },

  getters: {
    getUser: (state) => state.me,
    getCount: (state) => state.counter,
    getAuth: (state) => state.isAuthenticated
  },

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
