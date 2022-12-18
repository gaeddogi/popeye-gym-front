<template>
  
  <v-container
  class="container"
  color="grey-lighten-3"
  max-width="400"
  >
  
    <h4>회원 관리</h4>

    <v-card-text
      class="px-0"
    >
      <v-text-field
        v-model="emailParam"
        label="사용자 이메일"
        variant="underlined"
        append-inner-icon="mdi-magnify"
        @click:append-inner="searchUsers"
      ></v-text-field>
    </v-card-text>


    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            no
          </th>
          <th class="text-left">
            email
          </th>
          <th class="text-left">
            
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(user, index) in users"
          :key="index"
        >
          <td>{{ index +1 }}</td>
          <td>{{ user.email }}</td>
          <td>
            
            <v-dialog
              v-model="dialog"
              persistent
              class="modal"
            >

              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  v-bind="props"
                  @click="clickEnrollBtn(user.id)"
                >
                  등록
                </v-btn>
              </template>


              <v-card>
                <v-card-title>
                  <span class="text-h5">수강권 등록</span>
                </v-card-title>
                
                <v-card-text>
                  <v-container>
                    
                    <v-row>
                      <v-col cols="12">
                        <v-select
                          v-model="trainerId"
                          :rules="[v => !!v || 'type을 선택해주세요']"
                          :items="trainers"
                          item-title="title"
                          item-value="id"
                          label="트레이너 선택*"
                          required
                          return object
                        ></v-select>
                      </v-col>
                      
                      <v-col cols="12">
                        <v-text-field
                          v-model="times"
                          label="횟수*"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                  </v-container>
                  <small>*필수입력</small>
                </v-card-text>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="dialog = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="handleEnroll"
                  >
                    Save
                  </v-btn>
                </v-card-actions>

              </v-card>
            
            </v-dialog>
          </td>
        </tr>
      </tbody>
    </v-table>

    <div class="text-center">
      <v-pagination
        v-model="currentPage"
        :length="length"
        :total-visible="6"
        @click="clickPage"
      ></v-pagination>
    </div>

  </v-container>


</template>

<script>
import { getUserAll } from '@/api/admin/user.js'
import { getTrainerAll } from '@/api/admin/trainer.js'
import { enroll } from '@/api/admin/enroll.js'

import _ from 'lodash'

export default {
  data() {
    return {
      emailParam: '',


      dialog: false,


      users: [],
      trainers: [],

      trainerId: null,
      userId: 0,
      times: '',

      currentPage: 1,
      length: 0,


    }
  },
  created() {
    this.searchUsers()
    this.setTrainers()
  },
  methods: {
    setTrainers() {
      getTrainerAll()
        .then(({ data }) => {
          console.log(data)

          this.trainers = data.content.map(o => {
            const title = `${o.name}_${o.type}`
            const id = o.id

            return {id, title}
          })
        })

    },
    searchUsers() {
      const emailParam = this.emailParam
      const page = this.currentPage -1

      getUserAll({emailParam, page})
        .then( ({ data }) => {
          console.log(data)
          this.length = data.totalPages
          this.users = data.content

        })
    },
    clickEnrollBtn(userId) {
      console.log(userId)
      this.userId = userId
    },
    handleEnroll() {
      this.dialog = false

      const userId = this.userId
      const trainerId = this.trainerId
      const times = this.times

      enroll(userId, trainerId, times)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickPage() {
      this.searchUsers()
    },
  },
  watch: {
    emailParam: _.debounce(function(newVal, oldVal) {
      console.log(newVal, oldVal)

      this.searchUsers()


    }, 250)
  },
  
}
</script>

<style scoped>
.container {
  /* background-color: aliceblue; */
  max-width: 88%;
}

.modal {
  max-width: 50%;
}

</style>