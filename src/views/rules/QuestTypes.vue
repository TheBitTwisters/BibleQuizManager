<template>
  <div id="biblequiz-question-types">

    <v-card class="mb-5">
      <v-card-title>
        Question Types
      </v-card-title>
      <v-data-table :headers="headers" :items="quest_types" :loading="loadingItems">
        <template v-slot:item.actions="{ item }">
          <v-btn text small color="primary"
            @click="editQuestType(item)">
            <v-icon left>mdi-pencil</v-icon>
            Edit
          </v-btn>
        </template>
      </v-data-table>
      <v-card-actions>
        <v-btn plain color="primary" @click="newQuestType">New Question Type</v-btn>
      </v-card-actions>
    </v-card>

    <!-- QuestType details dialog -->
    <v-dialog v-model="form.show" persistent max-width="360">
      <v-card>
        <v-card-title>
          QuestType
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid" @submit.prevent="saveQuestType">

            <v-text-field label="Name"
              v-model="form.data.name"
              outlined required counter maxlength="32">
            </v-text-field>
            <v-text-field label="# of choices"
              v-model="form.data.choices_count"
              type="number"
              outlined required>
            </v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!form.valid" @click="saveQuestType">
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
import apiQuestTypes from '@/api/quest_types'

export default {
  name: 'view-quest_types-list',
  data: () => ({
    loadingItems: false,
    headers: [
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: '# of Choices',
        value: 'choices_count',
      },
      {
        text: 'Actions',
        value: 'actions'
      }
    ],
    quest_types: [],
    form: {
      data: {
        id: 0,
        name: '',
        choices_count: ''
      },
      show: false,
      valid: false,
      submitting: false,
      success: false
    },
  }),
  mounted () {
    this.getQuestTypes()
  },
  methods: {
    getQuestTypes: function () {
      this.loadingItems = true
      apiQuestTypes.getAll()
        .then(response => {
          this.quest_types = response.quest_types
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    newQuestType: function () {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: 0,
        name: '',
        choices_count: 1
      }
      this.form.show = true
    },
    editQuestType: function (quest_type) {
      this.form.submitting = false
      this.form.success = false
      this.form.data = quest_type
      this.form.show = true
    },
    saveQuestType: async function () {
      this.form.submitting = true
      try {
        var response = {}
        if (this.form.data.id > 0) {
          response = await apiQuestTypes.update(this.form.data)
        } else {
          response = await apiQuestTypes.create(this.form.data)
        }
        this.$store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        this.form.data.id = response.quest_type.id
        if (!response.err) {
          this.form.show = false
          this.getQuestTypes()
        }
      } catch(err) {
        console.log(err)
        this.$store.commit('SHOW_SNACKBAR', {
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
