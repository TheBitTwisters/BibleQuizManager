<template>
  <v-app>
    <Appbar/>
    <NavDrawer/>
    <v-main class="grey lighten-2">
      <v-container class="py-8 px-6">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Appbar from '@/components/Appbar'
import NavDrawer from '@/components/NavDrawer'

export default {
  name: 'App',
  components: {
    Appbar,
    NavDrawer
  },
  data: () => ({
    //
  }),
};
</script>
