<template>
  <v-dialog v-model="dialog" width="500px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      <v-btn text color="orange" v-on="on">Edit date</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit meetup date</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout>
          <v-flex xs12>
            <v-row justify="center">
              <v-date-picker v-model="editableDate" width="100%" actions>
                  <template scope="{save,cancel}">
                      <v-btn class="blue--text darken-1" text @click.native="dialog = false">Close</v-btn>
                      <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
                  </template>
              </v-date-picker>
            </v-row>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onSaveChanges">Save</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    props: ['meetup'],
    data () {
        return {
            dialog: false,
            editableDate: null
        }
    },
    methods: {
        onSaveChanges(){
          const newDate=new Date(this.meetup.date)
          const newDay = new Date(this.editableDate).getUTCDate()
          console.log(newDay)
          const newMonth = new Date(this.editableDate).getUTCMonth()
          // console.log(newMonth)
          const newYear = new Date(this.editableDate).getUTCFullYear()
          // console.log(newYear)
          newDate.setUTCDate(newDay)
          newDate.setUTCMonth(newMonth)
          newDate.setUTCFullYear(newYear)
          console.log(newDate);
          console.log(newDate.toISOString());
          this.$store.dispatch('updateMeetupData', {
            id: this.meetup.id,
            date: newDate.toISOString()
          })
          this.dialog  = false
        }
    },
    created () {
        this.editableDate = new Date(this.meetup.date).toISOString().substr(0,10);//this.meetup.date
        // console.log(this.meetup.date)
    }
}
</script>