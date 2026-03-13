# 工单管理与图表展示页面

基于 Vue 3 + Vite + Ant Design Vue + ECharts 的工单列表与工时分布图表展示。

## 技术栈

- Vue 3 (Composition API)
- Vue Router
- Pinia
- Ant Design Vue
- ECharts
- Less
- Vite

## 功能

- **登录页**：用户名 / 密码（任意值）；用户名为 `admin` 为管理员，其余为普通用户；登录后跳转主页面。
- **工单列表**：表格展示 ID、Project、Overtime、Hours、Created At；每行「Delete」仅管理员可见；删除后图表自动更新。
- **图表**：按项目分组统计累计工时，柱状图标题为「Project Hours Distribution」。

## 运行

```bash
npm install
npm run dev
```

浏览器访问默认地址（如 http://localhost:5173/），会重定向到登录页；使用 `admin` 登录可看到删除按钮。

## 项目结构

```
src/
├── main.js
├── App.vue
├── router/index.js
├── stores/
│   ├── userStore.js   # 用户权限 isAdmin
│   └── orderStore.js  # 工单列表与按项目汇总
├── data/orders.js     # 初始 mock 数据
└── views/
    ├── Login.vue      # 登录
    └── Main.vue       # 工单表格 + 柱状图
```

## 说明文档（提交用）

完整的一页说明见 **[说明文档.md](./说明文档.md)**，包含：
- 使用的 AI 工具及所在模块
- AI 生成代码范围及本人修改说明
- 最满意 / 最难处理的部分说明
