<template>
  <v-card class="mx-auto" max-width="360px">
    <v-card-title>
      Login
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="login">

        <v-text-field label="Name" placeholder="Enter name"
          v-model="form.data.name"
          outlined required hide-details>
        </v-text-field>
        <v-otp-input
          v-model="form.data.pin"
          type="number"
          length="4"
          @finish="login">
        </v-otp-input>

      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import apiAuth from '@/api/auth'

export default {
  name: 'view-auth-login',
  data: () => ({
    form: {
      data: {
        name: '',
        pin: ''
      },
      valid: false,
      showPassword: false,
      submitting: false,
      message: '',
      success: false
    }
  }),
  beforeMount () {
    this.$store.commit('SET_APP_DRAWER', false)
  },
  methods: {
    login: function () {
      this.form.submitting = true
      this.form.message = ''
      apiAuth.login(this.form.data)
        .then(data => {
          this.$store.commit('SHOW_SNACKBAR', {
            status: 'success',
            message: data.message
          })
          this.$store.dispatch('session-login', data)
        })
        .catch(err => {
          console.log(err)
          this.$store.commit('SHOW_SNACKBAR', {
            status: 'error',
            message: err.message
          })
        })
        .finally(() => {
          this.form.submitting = false
        })
    }
  }
}
</script>
