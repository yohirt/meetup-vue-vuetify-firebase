<template>
  <v-dialog v-model="dialog" width="500px">
    <template v-slot:activator="{ on }">
      <!-- <v-btn color="primary" dark v-on="on">Open Dialog</v-btn> -->
    
      <v-btn text color="orange" v-on="on">{{userIsregistered ? 'Unregister' : 'Registerss'}}</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline" v-if="userIsregistered">Wyrejestrować?</span>
        <span class="headline" v-else>Zarejestrować?</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout>
          <v-flex xs12>
            <v-row justify="center" class="mb-2">Zawsze możesz zmienić zdanie</v-row>
            <v-row justify="center">
              <v-btn class="green--text darken-5 mr-5" @click="dialog = false">Cancel</v-btn>
              <v-btn class="red--text darken-5" @click="onAgree">Zatwierdź</v-btn>
            </v-row>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: ["meetupId"],
  computed: {
    userIsregistered() {
      // console.log(this.$store.getters.user.registeredMeetups)
      const test = 
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          // console.log("this.meetupId =>" + this.meetupId);
          return meetupId === this.meetupId;
        }) >= 0
        return test
        console.log(test);
    
    }
  },
  methods: {
    onAgree() {
      if (this.userIsregistered) {
        // console.log('register dialog - onAgree - unregisterUserFromMeetup');
        this.$store.dispatch("unregisterUserFromMeetup", this.meetupId);
      } else {
        // console.log('RefisterDialog - onAgree - registerUserForMeetup');
        this.$store.dispatch("registerUserForMeetup", this.meetupId);
      }
      this.dialog = false;
    }
  }
};
</script>