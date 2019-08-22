<template>
  <v-dialog v-model="dialog" width="500px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      <v-btn text color="orange" v-on="on">Edit time</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit meetup time</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout>
          <v-flex xs12>
            <v-row justify="center">
              <v-time-picker v-model="editableTime" width="100%" actions>
                <template scope="{save,cancel}">
                  <v-btn class="blue--text darken-1" text @click.native="dialog = false">Close</v-btn>
                  <v-btn class="blue--text darken-1" text @click.native="onSaveChanges">Save</v-btn>
                </template>
              </v-time-picker>
            </v-row>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <!-- <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onSaveChanges">Save</v-btn>
      </v-card-actions>-->
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editableTime: null
    };
  },
  methods: {
    onSaveChanges() {
      const newDate = new Date(this.meetup.date);
      if (typeof this.editableTime === "string") {
        newDate.setHours(this.editableTime.substr(0, 2));
        newDate.setMinutes(this.editableTime.substr(3, 5));
      } else {
        this.editableTime = new Date(this.meetup.date);
      }
      console.log("newDate =" + newDate.toLocaleString);
      const objUpdate = {
        id: this.meetup.id,
        date: newDate.toLocaleString()
      };
      this.$store.dispatch("updateMeetupData", objUpdate);
      console.log("objUpdate => " + objUpdate.date);
      this.dialog = false
    }
  },
  created() {
    this.editableTime = new Date(this.meetup.date);
    console.log("this.editableTime= " + this.editableTime);
  }
};
</script>