<template>
  <v-dialog v-model="dialog" width="500px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
      <v-btn text color="orange" v-on="on">Edytuj</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit meetup</span>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              label="Nazwa"
              name="title"
              id="title"
              placeholder="title"
              v-model="editedTitle"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-textarea
              label="Opis"
              name="description"
              id="description"
              placeholder="Opis"
              v-model="editedDescription"
            ></v-textarea>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onSaveChanages">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["meetup"],
  data() {
    return {
      dialog: false,
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.descrption
    };
  },
  methods: {
    onSaveChanages() {
      // console.log('this.editedTitle ->' + this.editedTitle.trim())
      // console.log('this.editedDescription ->' + this.editedDescription.trim())
      // if (
      //   this.editedTitle.trim() === '' ||
      //   this.editedDescription.trim() === ''
      // ) {
      //   return;
      // }
      console.log('this.meetup.id -> '+ this.meetup.id)
      console.log('this.meetup.editedTitle -> '+ this.editedTitle)
      console.log('this.meetup.editedDescription -> '+ this.editedDescription)
      this.dialog = false;
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      });
    }
  }
};
</script>