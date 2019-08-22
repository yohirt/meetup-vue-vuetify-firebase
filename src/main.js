import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store/index.js'
import DataFilter from './filters/date'
import * as firebase from 'firebase'
import Alert from './components/shared/Alert'
import EditMeetupDetailsDialog from "./components/Meetup/Edit/EditMeetupDetailsDialog";
import EditMeetupDateDialog from "./components/Meetup/Edit/editMeetupDateDialog";
import EditMeetupTimeDialog from "./components/Meetup/Edit/EditMeetTimeDialog";
import MeetupRegisterDialog from "./components/Meetup/Registration/RegisterDialog";

Vue.config.productionTip = false
Vue.filter('date', DataFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog' ,EditMeetupDateDialog )
Vue.component('app-edit-meetup-time-dialog' ,EditMeetupTimeDialog )
Vue.component('app-edit-register-dialog' ,MeetupRegisterDialog )

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDtCjl_FZxJIJBNWQkUUtVoriRSG_sbEEY',
      authDomain: 'vue-vuetify-firebase-meetup-v1.firebaseapp.com',
      databaseURL: 'https://vue-vuetify-firebase-meetup-v1.firebaseio.com',
      projectId: 'vue-vuetify-firebase-meetup-v1',
      storageBucket: 'gs://vue-vuetify-firebase-meetup-v1.appspot.com/',
      // messagingSenderId: "53173354421",
    })
    firebase.auth().onAuthStateChanged((user) =>{
      if (user) {
        // console.log('main -User is signed in.'); 
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      } else {
        // console.log('No User is signed in.'); 
        // No user is signed in.
      }
    });
    this.$store.dispatch('laodMeetups')
  },
}).$mount('#app')
