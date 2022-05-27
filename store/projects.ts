
import { defineStore } from 'pinia'
import {  IProject } from '../models/interfaces'

interface IProjectsState {
  listing: IProject[]
  filtered: IProject[]
  loading: boolean
  current_page: number
  per_page: number
  total: number
  from: number
  last_page: number
  links: {
    active: boolean
    label: string
    url?: string | null
  }[] | [],
  error?: any
}



export const useProjectStore = defineStore({
  id: 'projects',
  state: (): IProjectsState => {
    return {
      loading: false,
      current_page: 1,
      per_page: 25,
      total: 115,
      listing: [],
      filtered: [],
      links: [],
      from: 1,
      last_page: 5,
      error: null
    }
  },
  actions: {
    initProjects ( payload: any ) {

      this.listing = useOrderBy(payload.data, 'name','asc');
      this.filtered = useOrderBy(payload.data, 'name','asc');
      this.current_page = payload.current_page
      this.per_page = payload.per_page
      this.total = payload.total 
      this.links = payload.links
      this.last_page = payload.last_page

    },

    searchProject (keyword:string) {
      if (keyword === '') {
        this.filtered = this.listing
      } else {
        this.filtered = this.listing.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
      }
    },

  },

  getters: {}
})

