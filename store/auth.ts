import { defineStore, acceptHMRUpdate } from 'pinia'
import { LOGIN_MUTATION } from '~~/graphql/mutations/authMutation';
import { GET_CURRENT_USER } from "~~/graphql/queries/userQuery";

interface IUser {
  dob: any,
  email: any,
  enabled: boolean,
  id: string,
  imagePath: string,
  name: string,
  username: string
}

interface IAuth {
  isAuthenticated: boolean,
  token: string | null,
  roles: string[],
  permissions: string[],
  location: string,
  me: IUser | null,
}


export const useAuthStore = defineStore({
  id: 'auth',

  state: ():IAuth => ({
    isAuthenticated: false,
    token: '',
    roles: [],
    permissions: [],
    location: 'vn',
    me: null
  }),

  actions: {
    async loginHandle(_email: string, _password: string) {
      const { $graphqlClient } = this.$nuxt.config.globalProperties;
      const { login } = ( await $graphqlClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email: _email,
          password: _password
        }
      })
      ).data;
      if ( login.user ) {
        this.isAuthenticated = true
        this.token = login.token
        this.roles = login.roles
        this.me = Object.assign(login.user)

        if (process.client) {
          localStorage.setItem('lottiAuthToken', login.token)
        }

        return  {
          isAuthenticated: true
        }

      } else {
        return {
          isAuthenticated: false,
          message: login.message
        }
      }

    },

    logoutHandle () {
      this.removeAuthToken();
    },

    setAuthToken () {
      if (process.client) {
        this.token = localStorage.getItem('lottiAuthToken')
        this.isAuthenticated = true
      }
    },

    removeAuthToken () {
      if (process.client) {
        localStorage.removeItem('lottiAuthToken');
        this.isAuthenticated = false
        this.token = ''
        this.roles = []
        this.me = null
      }
    },

    async setCurrentUser () {
      const { $graphqlClient } = this.$nuxt.config.globalProperties;
      const { data: { me } } = await $graphqlClient.query({
        query: GET_CURRENT_USER,
      });

      if (me) {
        const { dob, email, enabled, id, name, roles, username, permissions } = me
        this.me = Object.assign({}, { dob, email, enabled, id, imagePath: me.image_path, name, username })
        this.roles = roles
        this.permissions = permissions
      }

    },

    getAuthToken () {
      if (process.client) {
        const value = localStorage.getItem('lottiAuthToken')
        return value;
      }
    },

  },

  getters: {
    getUser: (state) => state.me,
    getToken: (state) => state.token,
    isAdmin: (state) => {
      return state.roles.includes('admin')
    }
  },

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
