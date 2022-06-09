import { acceptHMRUpdate, defineStore } from 'pinia';

interface IUser {
  dob: any;
  email: any;
  enabled: boolean;
  id: string;
  imagePath: string;
  name: string;
  username: string;
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

  state: (): IAuth => ({
    isAuthenticated: false,
    token: '',
    roles: [],
    permissions: [],
    location: 'vn',
    me: null
  }),

  actions: {
    setAuth(login: any) {
      if (login.user) {
        this.isAuthenticated = true
        this.token = login.token
        this.roles = login.roles
        this.me = Object.assign(login.user)

        if (process.client) {
          localStorage.setItem('lottiAuthToken', login.token)
        }

        return {
          isAuthenticated: true
        }

      } else {
        return {
          isAuthenticated: false,
          message: login.message
        }
      }

    },

    logoutHandle() {
      this.removeAuthToken()
    },

    setAuthToken() {
      if (process.client) {
        this.token = localStorage.getItem('lottiAuthToken')
        this.isAuthenticated = true
      }
    },

    removeAuthToken() {
      localStorage.removeItem('lottiAuthToken')
      localStorage.removeItem('lottiProjects')
      localStorage.removeItem('lottiTimer')

      this.isAuthenticated = false
      this.token = ''
      this.roles = []
      this.me = null
    },

    setCurrentUser (me: any) {
      // const { $graphqlClient } = this.$nuxt.config.globalProperties;
      // const { data: { me } } = await $graphqlClient.query({
      //   query: GET_CURRENT_USER,
      // });

      // const { data: { me } } = await cmsClient.query({
      //   query: GET_CURRENT_USER,
      // });

      if (me) {
        const { dob, email, enabled, id, name, roles, username, permissions } = me
        this.me = Object.assign({}, { dob, email, enabled, id, imagePath: me.image_path, name, username })
        this.roles = roles
        this.permissions = permissions
      }

    },

    getAuthToken() {
      if (process.client) {
        const value = this.token ? this.token : localStorage.getItem('lottiAuthToken')
        return value;
      }
    },

    getCurrentUser() {
      return this.me
    }

  },

  getters: {
    getUser: (state) => state.me,
    getToken: (state) => state.token,
    isAdmin: (state) => {
      return state.roles.includes('admin')
    }
  }

})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
