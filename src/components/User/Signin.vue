<template>
  <v-container>
     <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <!-- allert -->
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form action @submit.prevent="onSignIn">
                <v-layout>
                  <v-flex xs12>
                    <v-text-field name="email" label="email" id="email" v-model="email" required>rtaraszka@poczta.fm</v-text-field>
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Normal with hint text"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    >asdasd</v-text-field>
                    
                    <v-btn
                      class="ma-2"
                      :loading='loading'
                      :disabled="loading"
                      color="primary"
                      type="submit"
                      
                    >Zaloguj się</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { close } from 'fs';
export default {
  data() {
    return {
      email: "",
      show1: false,
      show2: false,
      password: "",
      email: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 2 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match",
        // comparePassword: this.password !== this.repeatPassword ? "Hasła nie pasują do siebie" :''
      }
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    },
    loading(){
      return this.$store.getters.loading
    },error(){
      return this.$store.getters.error
    }
  },
  watch:{
    user(value){
      if(value != null && value!= undefined){
        this.$router.push('/')
      }
    }
  },
  methods:{
    onSignIn(){
      //Vuex
    // console.log('odpalona onSignIn')
    this.$store.dispatch('signUserIn', {email: this.email, password: this.password} )
    },
    onDismissed(){
      this.$store.dispatch("clearError")
    }
  }
 
};
</script>