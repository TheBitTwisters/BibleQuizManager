<template>
  <div id="biblequiz-rules-levels">

    <v-card class="mb-5">
      <v-card-title>
        Levels
      </v-card-title>
      <v-data-table :headers="headers" :items="levels" :loading="loadingItems">
        <template v-slot:item.actions="{ item }">
          <v-btn text small color="primary"
            @click="editLevel(item)">
            <v-icon left>mdi-pencil</v-icon>
            Edit
          </v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn plain color="primary" @click="newLevel">New Level</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Level details dialog -->
    <v-dialog v-model="form.show" persistent max-width="360">
      <v-card>
        <v-card-title>
          Level
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid" @submit.prevent="saveLevel">

            <v-text-field label="Name"
              v-model="form.data.name"
              outlined required counter maxlength="32">
            </v-text-field>
            <v-text-field label="Score"
              v-model="form.data.score"
              type="number"
              outlined required>
            </v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!form.valid" @click="saveLevel">
            Save
          </v-btn>
          <v-btn @click="form.show = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import store from '@/store'
import apiLevels from '@/api/levels'

export default {
  name: 'view-rules-levels',
  data: () => ({
    loadingItems: false,
    headers: [
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'Score',
        value: 'score',
      },
      {
        text: 'Actions',
        value: 'actions'
      }
    ],
    levels: [],
    form: {
      data: {
        id: 0,
        name: '',
        score: 1
      },
      show: false,
      valid: false,
      submitting: false,
      success: false
    },
  }),
  mounted () {
    this.getLevels()
  },
  methods: {
    getLevels: function () {
      this.loadingItems = true
      apiLevels.getAll()
        .then(response => {
          this.levels = response.levels
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    newLevel: function () {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: 0,
        name: '',
        score: 1
      }
      this.form.show = true
    },
    editLevel: function (level) {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: level.id,
        name: level.name,
        score: level.score
      }
      this.form.show = true
    },
    saveLevel: async function () {
      this.form.submitting = true
      try {
        var response = {}
        if (this.form.data.id > 0) {
          response = await apiLevels.update({
            level_id: this.form.data.id,
            name: this.form.data.name,
            score: this.form.data.score
          })
        } else {
          response = await apiLevels.create(this.form.data)
        }
        store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        this.form.data.id = response.level.id
        if (!response.err) {
          this.form.show = false
          this.getLevels()
        }
      } catch(err) {
        console.log(err)
        store.commit('SHOW_SNACKBAR', {
          status: 'error',
          message: err.message
        })
      } finally {
        this.form.submitting = false
      }
    }
  }
}
</script>
