<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <!-- card -->
        <v-card class="mx-auto mb-3" max-width="400" v-for="meetup in meetups" :key="meetup.id">
          <v-img class="white--text" height="200px" :src="meetup.imageUrl">
            <v-card-title class="align-end fill-height">{{meetup.title}}</v-card-title>
          </v-img>

          <v-card-text>
            <span>{{meetup.date | date}}</span>
            <br />
            <span class="text--primary">
              <span>Id meetupa: {{meetup.id}}</span>
              <br />
              <span>Whitsunday Island, Whitsunday Islands</span>
            </span>
  
          </v-card-text>

              
          <v-card-actions>
            <!-- <v-btn text color="orange" >Share</v-btn> -->
            <v-btn text color="orange" :to="'meetup/'+meetup.id">Zobacz szcegóły</v-btn>
            
          </v-card-actions>
        </v-card>
        <!--  -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
    
  }
};
</script>