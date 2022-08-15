<template>
  <v-app>
    <Appbar v-if="!isCurrentPageMonitor"/>
    <NavDrawer v-if="!isCurrentPageMonitor"/>
    <Snackbar v-if="!isCurrentPageMonitor"/>
    <v-main class="grey lighten-2">
      <v-container fluid class="fill-height" style="align-items: start;">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
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
  computed: {
    isCurrentPageMonitor: function () {
      return this.$router.currentRoute.name == 'Monitor'
    }
  },
  mounted () {
    this.$store.dispatch('session-check')
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
