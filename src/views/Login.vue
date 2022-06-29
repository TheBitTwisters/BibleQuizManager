<template>
  <v-card class="mx-auto" max-width="360px">
    <v-card-title>
      Login
    </v-card-title>
    <v-card-text>
      <v-form v-model="form.valid" @submit.prevent="login">

        <v-text-field label="Name"
          v-model="form.data.name"
          required>
        </v-text-field>
        <v-otp-input
          v-model="form.data.pin"
          length="4">
        </v-otp-input>

        <v-alert v-if="form.message != ''" dense>
          {{ form.message }}
        </v-alert>

      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn type="submit" :disabled="!form.valid"
        @click="login">
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import store from '@/store'
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
  methods: {
    login: function () {
      this.form.submitting = true
      this.form.message = ''
      apiAuth.login(this.form.data)
        .then(data => {
          this.form.message = data.message
          store.dispatch('session-login', data)
        })
        .catch(err => {
          console.log(err)
          this.form.message = err.message
        })
        .finally(() => {
          this.form.submitting = false
        })
    }
  }
}
</script>
