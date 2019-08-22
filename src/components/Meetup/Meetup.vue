<template>
  <v-container>
    <v-layout v-if="onLoadMeetups">
      <v-flex xs12 class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs-12>
        <v-card class="m-2">
          <v-card-title>
            <h6>{{meetup.title}}</h6>
          </v-card-title>
          <v-card>
            <!-- {{meetup.date}} -->
            <v-img class="white--text" height="100px" :src="meetup.imageUrl">
              <v-card-title class="align-end fill-height">{{meetup.title}}</v-card-title>
            </v-img>
            <v-card-text>
              <span>{{meetup.date | date}}</span>
              <!-- <span>{{meetup.date }}</span> -->
              <br />
              {{meetup.title}}
            </v-card-text>
            <v-card-actions>
              <template v-if="userIsCreator">
                <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                <app-edit-meetup-date-dialog :meetup="meetup"></app-edit-meetup-date-dialog>
                <app-edit-meetup-time-dialog :meetup="meetup"></app-edit-meetup-time-dialog>
              </template>

              <app-edit-register-dialog
                :meetupId="meetup.id"
                v-if="userIsAuthenticated && !userIsCreator"
              ></app-edit-register-dialog>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      // return this.$store.getters.loadedMeetup(this.id)
      // console.log("asdasdasd");
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    onLoadMeetups() {
      // console.log(this.$store.state.shared.loading);
      // return false;
      return this.$store.state.shared.loading;
    }
  }
};
</script>