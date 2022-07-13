<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout"
    :color="status">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" @click="show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import store from '@/store'

export default {
  name: 'component-snackbar',
  computed: {
    show: {
      get: () => store.state.app.snackbar.show,
      set: (val) => {
        if (!val) {
          store.commit('HIDE_SNACKBAR')
        }
      }
    },
    timeout: () => store.state.app.snackbar.timeout,
    message: () => store.state.app.snackbar.message,
    status: () => store.state.app.snackbar.status
  }
}
</script>
