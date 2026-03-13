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
      // 按工时从高到低排序
      const entries = Object.entries(map).sort((a, b) => b[1] - a[1])
      return {
        projects: entries.map((e) => e[0]),
        hours: entries.map((e) => e[1]),
      }
    },
  },
  actions: {
    removeOrder(id) {
      this.list = this.list.filter((o) => o.id !== id)
    },
    /** 恢复所有工单列表为 orders.js 中的初始数据（测试用） */
    resetOrders() {
      this.list = [...MOCK_ORDERS]
    },
  },
})
