<template>
  <v-app>
    <Appbar/>
    <NavDrawer/>
    <Snackbar/>
    <v-main class="grey lighten-2">
      <v-container fluid class="fill-height">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import store from '@/store'
import Appbar from '@/components/Appbar'
import NavDrawer from '@/components/NavDrawer'
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',
  components: {
    Appbar,
    NavDrawer,
    Snackbar
  },
  data: () => ({
    //
  }),
  mounted () {
    store.dispatch('session-check')
  }
}
</script>

<style>
  html {
    overflow-y: auto;
  }
  fieldset {
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
  }
  legend {
    padding: 0 .25em;
  }
</style>
