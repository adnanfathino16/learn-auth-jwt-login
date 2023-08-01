<template>
    <div class="container">
        <div class="d-flex align-items-center justify-content-center container-dalam">
            <div class="card p-3" style="width: 35rem;">
                <div class="card-body">
                    <div v-if="alert.success" class="alert alert-primary">
                        <p>{{ alert.success }}</p>
                    </div>
                    <div v-if="alert.failed" class="alert alert-danger">
                        <p>{{ alert.failed }}</p>
                    </div>
                    <form @submit.prevent="login">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input v-model="dataLogin.username" type="text" class="form-control" id="username"
                                placeholder="Username">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input v-model="dataLogin.password" type="password" class="form-control" id="password"
                                placeholder="Password">
                        </div>
                        <div class="d-flex justify-content-between">
                            <button type="submit" class="btn btn-primary">Login</button>
                            <router-link :to="{ name: 'daftar' }">Halaman Daftar</router-link>
                        </div>
                    </form>

                    <div class="mt-2">
                        <p>Lupa Password ? <router-link :to="{ name: 'lupa-password' }">Klik Disini!</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router'

export default {
    setup() {
        const dataLogin = reactive({
            username: "",
            password: ""
        })

        const alert = reactive({
            success: "",
            failed: ""
        })

        const router = useRouter()
        const token = localStorage.getItem('token')
        if (token) {
            router.push({ name: 'dashboard' })
        }

        const login = () => {
            axios.post("http://localhost:8000/api/login", dataLogin)
                .then((result) => {
                    if (result) {
                        localStorage.setItem('token', result.data.token)
                        router.push({ name: "dashboard" })
                    }
                    alert.success = result.data.message
                    setTimeout(() => {
                        alert.success = ""
                    }, 3000)
                }).catch((err) => {
                    alert.failed = err.response.data.message
                    setTimeout(() => {
                        alert.failed = ""
                    }, 3000)
                })
        }

        return { login, dataLogin, alert }
    },

}
</script>