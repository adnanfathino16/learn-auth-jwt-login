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
                    <form @submit.prevent="changePassword">
                        <div class="mb-3">
                            <label for="password" class="form-label">New Password</label>
                            <input v-model="password.new" type="password" class="form-control" id="password"
                                placeholder="Masukkan Password Baru" required minlength="6">
                            <div v-if="errorPassword.new">
                                <p class="text-danger">{{ errorPassword.new }}</p>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="confirm" class="form-label">Confim Password</label>
                            <input v-model="password.confirm" type="password" class="form-control" id="confirm"
                                placeholder="Ulangi Password" required minlength="6">
                            <div v-if="errorPassword.confirm">
                                <p class="text-danger">{{ errorPassword.confirm }}</p>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary" type="submit">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const password = reactive({
            new: "",
            confirm: ""
        })
        const errorPassword = reactive({
            new: "",
            confirm: ""
        })
        const alert = reactive({
            success: "",
            failed: ""
        })


        const changePassword = () => {
            const value = password.new
            if (!value) {
                errorPassword.new = "Password tidak boleh kosong"
            } else {
                errorPassword.new = ""
            }
            const confirm = password.confirm
            if (!confirm) {
                errorPassword.confirm = "confirm tidak boleh kosong"
            } else {
                errorPassword.confirm = ""
            }

            // mengecek apakah password baru dan confirm sama 
            if (value === confirm) {
                const data = {
                    id: route.params.token,
                    password: password.new
                }
                axios.put("http://localhost:8000/api/resetpassword", data)
                    .then((res) => {
                        if (res) {
                            alert.success = res.data.message
                            password.new = ""
                            password.confirm = ""
                            setTimeout(() => {
                                alert.success = ""
                            }, 2000)
                        }
                        // router.push({ name: 'login' })
                    })

            } else {
                alert.failed = "password tidak cocok"
                setTimeout(() => {
                    alert.failed = ""
                }, 2000)
            }
        }



        return { password, changePassword, errorPassword, alert }
    }
}
</script>