<template>
  <v-app>
    <v-template>

    <v-app-bar dark color="indigo">
      <v-app-bar-nav-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pionter"></router-link>Meetaups
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items v-for="item in menuItems" :key="item.title" class>
        <v-btn text :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn text v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>Wyloguj
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    
   <v-navigation-drawer  absolute
      
      temporary v-model="sideNav">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Application</v-list-item-title>
          <v-list-item-subtitle>subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-for="item in menuItems" :key="item.title" router :to="item.link">
        <v-list-item-content>
          <v-list-item-title href="asdasdasd">
            <v-icon left>{{item.icon}}</v-icon>
            {{item.title}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
</v-template>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  // name: "App",
  // components: {
  //   HelloWorld
  // },
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    menuItems() {
      let menuItems;
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "flight_takeoff", title: "Profil", link: "/profile" },

          {
            icon: "supervisor_account",
            title: "Zobacz spotkaniaa",
            link: "/meetups"
          },
          {
            icon: "location_on",
            title: "Zorganizuj spotkanie",
            link: "/createmeetup"
          }
        ];
      } else {
        menuItems = [
          { icon: "flight_takeoff", title: "Zarejestruj się", link: "/signup" },
          { icon: "face", title: "zaloguj się..", link: "/signin" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user != undefined
      );
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>
<style scope>
.v-btn__content {
  font-size: 10px;
}
</style>
