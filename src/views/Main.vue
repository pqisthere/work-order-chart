<template>
  <!-- 主页面：工单列表 + 工时分布图表 -->
  <div class="main-page">
    <div class="header">
      <h1>工单管理</h1>
      <div class="header-actions">
        <a-button type="link" @click="resetOrders">测试：恢复初始数据</a-button>
        <a-button type="link" @click="goLogin">退出登录</a-button>
      </div>
    </div>
    <!-- 工单表格：数据来自 orderStore，删除仅管理员可见 -->
    <a-card title="工单列表" class="table-card">
      <a-table
        :columns="columns"
        :data-source="orderStore.list"
        :pagination="false"
        :scroll="{ x: 'max-content' }"
        row-key="id"
      >
        <template #bodyCell="{ column, record }">
          <!-- Overtime 列显示 Yes/No -->
          <template v-if="column.key === 'overtime'">
            {{ record.overtime ? 'Yes' : 'No' }}
          </template>
          <!-- 操作列：仅管理员显示 Delete -->
          <template v-else-if="column.key === 'action'">
            <a-button
              v-if="userStore.isAdmin"
              type="link"
              danger
              size="small"
              @click="remove(record.id)"
            >
              Delete
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- 按项目汇总工时的柱状图，与表格同源会联动更新 -->
    <a-card title="Project Hours Distribution" class="chart-card">
      <div ref="chartRef" class="chart-container"></div>
    </a-card>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { useUserStore } from '../stores/userStore'
import { useOrderStore } from '../stores/orderStore'

const router = useRouter()
const userStore = useUserStore()
const orderStore = useOrderStore()
const chartRef = ref(null)  // 图表挂载的 DOM
let chartInstance = null    // ECharts 实例

// 表格列配置：仅管理员时显示操作列，普通用户不占空白
const baseColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Project', dataIndex: 'project', key: 'project' },
  { title: 'Overtime', key: 'overtime', width: 100 },
  { title: 'Hours', dataIndex: 'hours', key: 'hours', width: 100 },
  { title: 'Created At', dataIndex: 'created_at', key: 'created_at', width: 180 },
]
const actionColumn = { title: '', key: 'action', width: 100 }
const columns = computed(() =>
  userStore.isAdmin ? [...baseColumns, actionColumn] : baseColumns
)

// 图表配置：基于 orderStore.projectHours 计算，删除工单后自动更新
const chartOption = computed(() => {
  const { projects, hours } = orderStore.projectHours
  return {
    title: { text: '' },
    tooltip: {},
    xAxis: { type: 'category', data: projects },
    yAxis: { type: 'value', name: 'Hours' },
    series: [{ name: 'Hours', type: 'bar', data: hours }],
  }
})

// 删除工单（会触发图表重新计算）
function remove(id) {
  orderStore.removeOrder(id)
}

// 恢复所有工单列表为 orders.js 初始数据（测试用）
function resetOrders() {
  orderStore.resetOrders()
}

// 返回登录页
function goLogin() {
  router.push('/login')
}

// 初始化 ECharts 柱状图
function initChart() {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  chartInstance.setOption(chartOption.value)
}

// 工单数据变化时更新图表
watch(chartOption, (opt) => {
  if (chartInstance) chartInstance.setOption(opt)
}, { deep: true })

// 窗口 resize 时图表自适应
function handleResize() {
  chartInstance?.resize()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style lang="less" scoped>
.main-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: clamp(12px, 4vw, 24px);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: clamp(16px, 3vw, 24px);
  flex-wrap: wrap;
  gap: 8px;
}
.header h1 {
  font-size: clamp(1.25rem, 4vw, 1.5rem);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.table-card {
  margin-bottom: 24px;
}
.chart-container {
  height: clamp(240px, 40vw, 320px);
  min-height: 240px;
}

@media (max-width: 480px) {
  .main-page {
    padding: 12px;
  }
  .header {
    align-items: flex-start;
  }
  .header-actions {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }
  .header-actions :deep(.ant-btn) {
    padding: 0 8px;
  }
  .chart-container {
    height: 240px;
    min-height: 240px;
  }
}
</style>
