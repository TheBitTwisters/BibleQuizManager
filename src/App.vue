<template>
  <v-app>
    <Appbar/>
    <NavDrawer/>
    <Snackbar/>
    <v-main class="grey lighten-2">
      <v-container fluid style="height: 100%;">
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
  data: () => ({
    //
  }),
}
</script>

<style>
  fieldset {
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
  }
  legend {
    padding: 0 .25em;
  }
</style>
