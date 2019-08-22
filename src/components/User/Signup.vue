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
              <form action @submit.prevent="onSignUp">
                <v-layout>
                  <v-flex xs12>
                    <v-text-field name="email" label="email" id="email" v-model="email" required></v-text-field>
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'visibility' : 'visibility_off'"
                      :rules="[rules.required, rules.min, comparePassword]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Normal with hint text"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field
                      v-model="repeatPassword"
                      :append-icon="show2 ? 'visibility' : 'visibility_off'"
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Normal with hint text"
                      hint="At least 8 characters"
                      counter
                      @click:append="show2 = !show2"
                    ></v-text-field>
                    <v-btn
                      class="ma-2"
                      :loading='loading'
                      :disabled="loading"
                      color="primary"
                      type="submit"
                      
                    >Zarejestruj się</v-btn>
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
import { close } from "fs";
export default {
  data() {
    return {
      email: "",
      show1: false,
      show2: false,
      password: "",
      repeatPassword: "",
      email: "",
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 2 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
        // comparePassword: this.password !== this.repeatPassword ? "Hasła nie pasują do siebie" :''
      }
    };
  },
  computed: {
    comparePassword() {
      return this.repeatPassword !== this.password
        ? "hasłą nie pasują do siebie"
        : false;
      // return "asdasdasd"
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      // return true
      return this.$store.getters.error;
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  watch: {
    user(value) {
      if (value != null && value != undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignUp() {
      //Vuex
      console.log("odpalona onSignUp");
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      console.log("Dismissed Alert!");
      this.$store.dispatch("clearError");
    }
  }
};
</script>