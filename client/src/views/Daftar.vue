<template>
  <div class="container">
    <div class="d-flex align-items-center justify-content-center container-dalam">
      <div class="card p-3" style="width: 35rem;">
        <div class="card-body">
          <div v-if="alertsuccess" class="alert alert-primary">
            <p>{{ alertsuccess }}</p>
          </div>
          <div v-if="alertfailed" class="alert alert-danger">
            <p>{{ alertfailed }}</p>
          </div>
          <form @submit.prevent="save">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input v-model="daftar.username" type="text" class="form-control" id="username" placeholder="Username">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input v-model="daftar.email" type="email" class="form-control" id="email" placeholder="Email">
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input v-model="daftar.password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary" type="submit">Daftar</button>
              <router-link :to="{ name: 'login' }">Halaman Login</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      daftar: {
        username: "",
        email: "",
        password: ""
      },
      alertsuccess: "",
      alertfailed: ""
    }
  },
  methods: {
    save() {
      axios.post("http://localhost:8000/api/daftar", this.daftar)
        .then((result) => {
          this.alertsuccess = result.data.message
          setTimeout(() => {
            this.alertsuccess = ""
          }, 3000)
          this.daftar.username = ""
          this.daftar.email = ""
          this.daftar.password = ""

        }).catch((err) => {
          this.alertfailed = err.response.data.message
          setTimeout(() => {
            this.alertfailed = ""
          }, 3000)
        })
    }
  }
}
</script>