<template>
  <!-- 登录页：用户名 admin 为管理员，其余为普通用户 -->
  <div class="login-page">
    <a-card title="登录" class="login-card">
      <a-form
        :model="form"
        layout="vertical"
        @finish="onSubmit"
      >
        <a-form-item label="用户名" name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

// 登录表单：用户名/密码任意值均可
const form = reactive({
  username: '',
  password: '',
})

// 提交后根据用户名设置权限（admin=管理员），并跳转主页面
function onSubmit() {
  userStore.setRole(form.username)
  router.push('/main')
}
</script>

<style lang="less" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  padding: 16px;
}
.login-card {
  width: 100%;
  max-width: 360px;
  min-width: 280px;
}
</style>
