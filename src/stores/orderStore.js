import { defineStore } from 'pinia'
import { MOCK_ORDERS } from '../data/orders'

export const useOrderStore = defineStore('order', {
  state: () => ({
    list: [...MOCK_ORDERS],
  }),
  getters: {
    projectHours() {
      const map = {}
      this.list.forEach((item) => {
        if (!map[item.project]) map[item.project] = 0
        map[item.project] += item.hours
      })
      return {
        projects: Object.keys(map),
        hours: Object.values(map),
      }
    },
  },
  actions: {
    removeOrder(id) {
      this.list = this.list.filter((o) => o.id !== id)
    },
  },
})
