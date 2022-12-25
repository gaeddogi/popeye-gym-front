<template>
  <!-- <div>트레이너 관리</div> -->

    <v-form 
    ref="form"
    v-model="valid"
    lazy-validation
   >
    <v-container
      class="container"
    >

      <h4 style="margin-bottom: 30px;">트레이너 관리</h4>
      
      <div>신규 등록</div>

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            bg-color="white"
            v-model="trainerName"
            :rules="nameRules"
            :counter="10"
            label="트레이너 이름"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-select
            v-model="type"
            label="type"
            :rules="[v => !!v || 'type을 선택해주세요']"
            :items="['PILATES', 'PT']"
            variant="solo"
            required
          ></v-select>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-btn
            @click="enroll"
            style="height: 56px;"
            color="primary"
          >
            등록하기
          </v-btn>
        </v-col>

      </v-row>

    </v-container>
  </v-form>


  <v-container
    class="container"
    color="grey-lighten-3"
    max-width="400"
  >
    <!-- <div>트레이너 목록</div> -->

    <v-row>

      <v-card-text>
        <v-text-field
          v-model="nameParam"
          density="compact"
          variant="solo"
          label="트레이너 이름"
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
          @click:append-inner="searchTrainers"
          style="height: 68px !important;"
        ></v-text-field>
      </v-card-text>
      
      <v-card-text>
        <v-select
          label="type"
          v-model="typeParam"
          :items="['All', 'PILATES', 'PT']"
          return-object
          @update:modelValue="searchTrainers"
          variant="solo"
        ></v-select>
      </v-card-text>

    </v-row>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            no
          </th>
          <th class="text-left">
            이름
          </th>
          <th class="text-left">
            type
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(trainer, index) in trainers"
          :key="index"
        >
          <td>{{ index +1 }}</td>
          <td>{{ trainer.name }}</td>
          <td>{{ trainer.type }}</td>
        </tr>
      </tbody>
    </v-table>

    <div class="text-center" style="margin-top: 30px">
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
import { enroll, getTrainerAll } from '@/api/admin/trainer.js'
import _ from 'lodash'

export default {
  data() {
    return {

      valid: false,
      trainerName: '',
      type: null,
      nameRules: [
        v => !!v || '이름을 입력해주세요',
        v => v.length <= 10 || '10글자 이내로 입력해주세요',
      ],


      trainers: [],
      nameParam: '',
      typeParam: 'All',

      currentPage: 1,
      length: 0,
    }
  },
  created() {
    this.searchTrainers()
    // getTrainerAll()
    //   .then(({ data }) => {
    //     // console.log(data)
    //     this.trainers = data
    //   })
    //   .catch(err => {
    //     // console.log(err)
    //   })
  },
  watch: {
    nameParam: _.debounce(function(newVal, oldVal) {
      // console.log(newVal, oldVal)

      this.searchTrainers()


    }, 250)
  },
  methods: {
    searchTrainers () {

      const nameParam = this.nameParam
      const typeParam = this.typeParam === 'All' ? null : this.typeParam
      const page = this.currentPage -1

      getTrainerAll(nameParam, typeParam, page)
        .then(({ data }) => {
          // console.log(data)

          this.length = data.totalPages
          this.trainers = data.content
        })
        .catch(err => {
          // console.log(err)
        })
    },
    async enroll() {
      const { valid } = await this.$refs.form.validate()

      // console.log(valid)
      if (valid) {
        const name = this.trainerName
        const type = this.type
  
        // console.log(name, type)

        enroll(name, type)
        .then(res => {
          // console.log(res)
          this.reset()
          alert('등록되었습니다')
          
        })
        .catch(err => {
          // console.log(err)
        })
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    clickPage() {
      this.searchTrainers()
    },
  },
  
}
</script>

<style scoped>
.container {
  /* background-color: aliceblue; */
  max-width: 88%;
}

</style>