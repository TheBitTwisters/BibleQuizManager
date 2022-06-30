<template>
  <div id="biblequiz-levels">

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
        <v-btn plain color="primary" @click="newLevel">New</v-btn>
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

            <v-alert v-if="form.message != ''" dense>
              {{ form.message }}
            </v-alert>

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
import apiLevels from '@/api/levels'

export default {
  name: 'view-levels-list',
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
        title: '',
        date: ''
      },
      show: false,
      valid: false,
      submitting: false,
      message: '',
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
      this.form.message = ''
      this.form.success = false
      this.form.data = {
        active: 0,
        title: '',
        date: ''
      }
      this.form.show = true
    },
    editLevel: function (level) {
      this.form.submitting = false
      this.form.message = ''
      this.form.success = false
      this.form.data = level
      this.form.show = true
    },
    saveLevel: function () {
      this.form.submitting = true
      this.form.message = ''
      apiLevels.saveLevel(this.form.data)
        .then(data => {
          if (!data.err) {
            this.form.show = false
            this.getLevels()
          }
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
