<template>
  <v-app-bar app fixed>
    <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <!-- notification -->
    <v-btn icon v-if="isSessionActive()">
      <v-icon>mdi-bell-outline</v-icon>
    </v-btn>
    <!-- user -->
    <v-menu offset-y v-if="isSessionActive()">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-divider></v-divider>
        <v-list-item @click="showLogoutDialog = true">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- Dialog: Logout -->
    <v-dialog v-model="showLogoutDialog" persistent max-width="320">
      <v-card>
        <v-card-title>Logout</v-card-title>
        <v-card-text>Are you sure you want to logout?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="showLogoutDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" text  @click="logout">
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'component-appbar',
  data: () => ({
    showLogoutDialog: false
  }),
  computed: {
    ...mapGetters([
      'isSessionActive'
    ])
  },
  methods: {
    toggleDrawer: () => {
      store.commit('TOGGLE_APP_DRAWER')
    },
    logout: function () {
      this.showLogoutDialog = false
      store.dispatch('session-logout')
    }
  }
}
</script>
