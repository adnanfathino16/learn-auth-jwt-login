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
                    <form @submit.prevent="LupaPassword">
                        <div class="mb-3">
                            <label for="username" class="form-label">Email</label>
                            <input v-model="email" type="text" class="form-control" id="username"
                                placeholder="Masukkan Email">
                        </div>

                        <button type="submit" class="btn btn-primary">Kirim</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref } from 'vue'
import axios from 'axios'
export default {
    setup() {
        const email = ref('')
        const alert = reactive({
            success: '',
            failed: ''
        })
        const LupaPassword = () => {
            if (!email.value) {
                alert.failed = 'Email wajib diisi'
                setTimeout(() => {
                    alert.failed = ""
                }, 1000)
            } else {
                axios.put('http://localhost:8000/api/forgotpassword', { email: email.value })
                    .then((res) => {
                        email.value = ""
                        alert.success = res.data.message
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
        }
        return { LupaPassword, email, alert }
    }
}
</script>