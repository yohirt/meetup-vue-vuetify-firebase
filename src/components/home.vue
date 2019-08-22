<template>
  <v-container grid-list-md text-center>
    <v-layout row wrap class="mb-5">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/createmeetup">Zorganizuj spotkanie</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/createmeetup">Zorganizuj spotkanie</v-btn>
      </v-flex>
    </v-layout>
<v-layout>
  <v-flex xs12 class="text-center" v-if="onLoadMeetups">
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-flex>
</v-layout>
    <v-layout row wrap v-if="!onLoadMeetups">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            reverse-transition="fade-transition"
            transition="fade-transition"
            @click="onLoadMeetup(meetup.id)"
            
          >
            <div class="title">{{meetup.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-5">
      <v-flex xs12 class="text-xs-center">
        <p>Zapraszamy na nasze spotkania</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
    data(){
        return{
            // meetups:[
            //     {imageUrl: 'https://d-nm.ppstatic.pl/kadr/quizy/k/r/1/7e/98/5c66e9262d707_o,size,624x344,q,100,h,f6e939.jpg?1550248230', id: '1', title: 'Spotkanie - Tarnów' },
            //     {imageUrl: 'https://f4fcdn.eu/wp-content/uploads/2018/06/krakowmain.jpg', id: '2', title: 'Spotkanie - Kraków' },
            //     {imageUrl: 'https://static.polityka.pl/_resource/res/path/cf/3e/cf3e43e3-b095-43b5-85aa-14f19b3d33c3_f1400x900', id: '3', title: 'Spotkanie - Warszawa' }
            // ]
        }
    },
    computed:{
      meetups(){
        return this.$store.getters.featureMeetups
      },
      onLoadMeetups(){
        return this.$store.state.loading;
      }
    },
    methods:{
      onLoadMeetup(){
        this.$router.push('/meetup/'+ id);
      }
    }
}
</script>
<style scope>
.title {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 10px;
  color: #fff;
  border-radius: 3px;
  margin: 0 auto;
}
</style>