<template>
  <v-card>

    <v-card-title>
      Groups
      <v-spacer></v-spacer>
      <v-btn plain color="primary" @click="newGroup">
        New Group
      </v-btn>
    </v-card-title>

    <v-data-table :headers="headers" :items="groups"
      :loading="loadingItems"
      :items-per-page="-1"
      :hide-default-footer="true">
      <template v-slot:item.fullname="{ item }">
        {{ item.name }}
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ item.created_at | formatDate }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text small color="primary"
          @click="editGroup(item)">
          <v-icon left>mdi-pencil</v-icon>
          Edit
        </v-btn>
      </template>
    </v-data-table>

    <!-- Group details dialog -->
    <v-dialog v-model="form.show" persistent max-width="360">
      <v-card>
        <v-card-title>
          Group
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid" @submit.prevent="saveGroup">

            <v-text-field label="Name"
              v-model="form.data.name"
              outlined required counter maxlength="32">
            </v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!form.valid" @click="saveGroup">
            Save
          </v-btn>
          <v-btn @click="form.show = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-card>
</template>

<script>
import store from '@/store'
import apiPlayers from '@/api/players'

export default {
  name: 'view-groups-list',
  data: () => ({
    loadingItems: false,
    headers: [
      {
        text: 'ID',
        value: 'id'
      },
      {
        text: 'Name',
        value: 'name'
      },
      {
        text: 'Date created',
        value: 'created_at',
      },
      {
        text: 'Actions',
        value: 'actions'
      }
    ],
    groups: [],
    form: {
      data: {
        id: 0,
        name: ''
      },
      show: false,
      valid: false,
      submitting: false,
      success: false
    }
  }),
  mounted () {
    this.getGroups()
  },
  methods: {
    getGroups: function () {
      this.loadingItems = true
      apiPlayers.getGroups()
        .then(response => {
          this.groups = response.groups
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    newGroup: function () {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: 0,
        name: ''
      }
      this.form.show = true
    },
    editGroup: function (group) {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: group.id,
        name: group.name
      }
      this.form.show = true
    },
    saveGroup: async function () {
      this.form.submitting = true
      try {
        var response = {}
        if (this.form.data.id > 0) {
          response = await apiPlayers.updateGroup({
            id: this.form.data.id,
            name: this.form.data.name
          })
        } else {
          response = await apiPlayers.createGroup(this.form.data)
        }
        store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        this.form.data.id = response.group.id
        if (!response.err) {
          this.form.show = false
          this.getGroups()
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
