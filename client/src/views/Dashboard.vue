<template>
    <div class="container">
        <h1>Halaman dashboard</h1>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter()
        const token = localStorage.getItem('token')
        if (!token) {
            router.push({ name: "login" })
        }
    }
}
</script>