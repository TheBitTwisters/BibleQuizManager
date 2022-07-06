<template>
  <div class="biblequiz-rules-index">
    <v-row>
      <v-col cols="12" lg="6" xl="4">
        <Levels/>
      </v-col>
      <v-col cols="12" lg="6" xl="4">
        <QuestTypes/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Levels from './Levels'
import QuestTypes from './QuestTypes'

export default {
  name: 'view-levels-index',
  components: {
    Levels,
    QuestTypes
  }
}
</script>
