import { defineStore } from 'pinia'
// import cmsClient from '~~/apollo/cmsClient'

// interface IIssues {
//   name: string
// }

// interface IStatus {
//   name: string
// }

// interface IUser {
//   name: string,
//   image_path: string | null
// }

// interface ITasks {
  
// }

// interface ITasksState {
//   list: ITasks[],
//   filteredList: ITasks[],
//   loading: boolean,
//   error: any,
//   sort: ''
// }

export const useTasksStore = defineStore({
  id: 'Tasks',
  state: () => {
    return {
      list: [],
			loading: false,
			error: null,
			taskDetail: null
    }
  },
  actions: {
    // async fetchAllTaskss () {
    //   try {
    //     this.loading = true
    //     const { Taskss } = (await cmsClient.query({
    //       query: GET_ALL_TasksS_FULL
    //     })).data;

    //     if (Taskss) {
    //       this.list = useOrderBy(Taskss, 'name','asc');
    //       this.filteredList = this.list
    //     }

    //   } catch (_error) {
    //     this.error = _error
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // searchTasks (keyword:string) {
    //   if (keyword === '') {
    //     this.filteredList = this.list
    //   } else {
    //     this.filteredList = this.list.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
    //   }
    // },
  },

  getters: {
  
  }
})

