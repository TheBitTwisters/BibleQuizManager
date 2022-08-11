<template>
  <v-card class="mb-5">
    <v-card-title>
      Members
      <v-spacer></v-spacer>
      <v-btn plain color="primary" @click="newMember">
        New Member
      </v-btn>
    </v-card-title>
    <v-data-table :headers="headers" :items="members"
      :loading="loadingItems"
      :items-per-page="-1"
      :hide-default-footer="true">
      <template v-slot:item.group_id="{ item }">
        {{ getGroupByID(item.group_id).name }}
      </template>
      <template v-slot:item.fullname="{ item }">
        {{ item.first_name + ' ' + item.last_name }}
      </template>
      <template v-slot:item.joined_at="{ item }">
        {{ item.joined_at | formatDate }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn text small color="primary"
          @click="editMember(item)">
          <v-icon left>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn text small color="primary"
          @click="editMemberGroup(item)">
          <v-icon left>mdi-account-multiple</v-icon>
          Set Group
        </v-btn>
      </template>
    </v-data-table>

    <!-- Member details dialog -->
    <v-dialog v-model="form.show" persistent max-width="360">
      <v-card>
        <v-card-title>
          Member
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid" @submit.prevent="saveMember">

            <v-text-field label="Last name"
              v-model="form.data.last_name"
              outlined required counter maxlength="32">
            </v-text-field>
            <v-text-field label="First name"
              v-model="form.data.first_name"
              outlined required counter maxlength="32">
            </v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!form.valid" @click="saveMember">
            Save
          </v-btn>
          <v-btn @click="form.show = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Member group dialog -->
    <v-dialog v-model="formGroup.show" persistent max-width="360">
      <v-card>
        <v-card-title>
          Member's Group
        </v-card-title>
        <v-card-text>
          <v-form v-model="formGroup.valid" @submit.prevent="saveMemberGroup">

            <v-text-field label="Member name"
              :value="formGroup.data.first_name + ' ' + formGroup.data.last_name"
              outlined readonly>
            </v-text-field>
            <v-select :items="groups" label="Select group"
              v-model="formGroup.data.group_id" item-text="name" item-value="id"
              outlined required>
            </v-select>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" :disabled="!formGroup.valid" @click="saveMemberGroup">
            Save
          </v-btn>
          <v-btn @click="formGroup.show = false">
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
  name: 'view-members-list',
  data: () => ({
    loadingItems: false,
    headers: [
      {
        text: 'ID',
        value: 'id'
      },
      {
        text: 'Group',
        value: 'group_id',
      },
      {
        text: 'Fullname',
        value: 'fullname'
      },
      {
        text: 'Date joined',
        value: 'joined_at',
      },
      {
        text: 'Actions',
        value: 'actions'
      }
    ],
    members: [],
    groups: [],
    form: {
      data: {
        id: 0,
        last_name: '',
        first_name: ''
      },
      show: false,
      valid: false,
      submitting: false,
      success: false
    },
    formGroup: {
      data: {
        id: 0,
        last_name: '',
        first_name: '',
        group_id: 0
      },
      show: false,
      valid: false,
      submitting: false,
      success: false
    }
  }),
  mounted () {
    this.getMembers()
  },
  methods: {
    getMembers: function () {
      this.loadingItems = true
      apiPlayers.getGroups()
        .then(response => {
          this.groups = response.groups
          apiPlayers.getAll()
            .then(response => {
              this.members = response.members
            })
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.loadingItems = false
        })
    },
    newMember: function () {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: 0,
        last_name: '',
        first_name: ''
      }
      this.form.show = true
    },
    editMember: function (member) {
      this.form.submitting = false
      this.form.success = false
      this.form.data = {
        id: member.id,
        last_name: member.last_name,
        first_name: member.first_name
      }
      this.form.show = true
    },
    saveMember: async function () {
      this.form.submitting = true
      try {
        var response = {}
        if (this.form.data.id > 0) {
          response = await apiPlayers.updateMember({
            member_id: this.form.data.id,
            last_name: this.form.data.last_name,
            first_name: this.form.data.first_name
          })
        } else {
          response = await apiPlayers.createMember(this.form.data)
        }
        store.commit('SHOW_SNACKBAR', {
          status: 'success',
          message: response.message
        })
        this.form.data.id = response.member.id
        if (!response.err) {
          this.form.show = false
          this.getMembers()
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
    },
    editMemberGroup: function (member) {
      this.formGroup.submitting = false
      this.formGroup.success = false
      this.formGroup.data = {
        id: member.id,
        last_name: member.last_name,
        first_name: member.first_name,
        group_id: member.group_id
      }
      this.formGroup.show = true
    },
    saveMemberGroup: function () {
      this.formGroup.submitting = true
      apiPlayers.setMemberGroup({
        member_id: this.formGroup.data.id,
        group_id: this.formGroup.data.group_id
      }).then(response => {
          this.formGroup.data = response.member
          if (!response.err) {
            store.commit('SHOW_SNACKBAR', {
              status: 'success',
              message: response.message
            })
            this.formGroup.show = false
            this.getMembers()
          }
        }).catch(err => {
          console.log(err)
          store.commit('SHOW_SNACKBAR', {
            status: 'error',
            message: err.message
          })
        })
    },
    getGroupByID: function (group_id) {
      for (let group of this.groups) {
        if (group.id == group_id) {
          return group
        }
      }
      return { name: '' }
    }
  }
}
</script>
