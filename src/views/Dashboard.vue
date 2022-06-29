<template>
  <div class="biblequiz-dashboard">
    <h1 class="my-5">Bible Quiz Manager</h1>
    <v-row>
      <v-col cols="12" lg="4">
        <Games/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Games from '@/views/Games'

export default {
  name: 'view-dashboard',
  components: {
    Games
  }
}
</script>
