<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 md3 offset-sm3>
        <h2>Utwórz nowe spotkanie</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout>
            <v-flex xs12 sm6 md3 offset-sm3>
              <v-text-field
                label="Nazwa"
                name="title"
                id="title"
                v-model="title"
                placeholder="title"
              ></v-text-field>

              <v-text-field
                label="Lokalizacja"
                name="lacation"
                v-model="location"
                id="location"
                placeholder="location"
              ></v-text-field>

              <v-file-input v-model="files" label="File input" @change="onfilePicked"></v-file-input>
              <img :src="imageUrl" alt width="300" />

              <v-textarea
                label="Opis"
                name="description"
                v-model="description"
                id="description"
                placeholder="Opis"
              ></v-textarea>

              <v-layout justify-center mb-5>
                <h4>Wybierz datę</h4>
              </v-layout>

              <v-layout justify-center>
                <v-date-picker class="mr-3" v-model="date"></v-date-picker>
                <v-time-picker v-model="time" format="24hr"></v-time-picker>
              </v-layout>
              <!-- <p>{{date}}</p> -->
              <!-- {{submitTableTateTime}} -->
              <!-- <v-layout justify-center>
                <h4>Wybierz godzinę</h4>
              </v-layout>
              -->
              <v-btn class="primary mt-5" type="submit" :disabled="!formIsValid">Utwórz wydarzenie</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      files: [],
      title: "..",
      description: "...",
      imageUrl: "",
      location: "...",
      time: new Date(),
      date: new Date().toISOString().substr(0, 10),
      // date: new Date(),
      image: null
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.description !== "" &&
        // this.imageUrl !== "" &&
        this.location !== ""
      );
    },
    submitTableDateTime() {
      const date = new Date(this.date);
      let hours = "";

      if (typeof this.time === "string") {
        // hours =
        date.setHours(this.time.substr(0, 2));
        date.setMinutes(this.time.substr(3, 5));
        // date.set
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }

      return date;
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.image) {
        return;
      }
      const meetupData = {
        title: this.title,
        description: this.description,
        image: this.image,
        location: this.location,
        date: this.submitTableDateTime
      };
      // console.log(meetupData);
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onfilePicked() {
      const file = this.files;
      // console.log(this.files.name);
      if (file.name.lastIndexOf(".") <= 0) {
        return alert("Prosze zweryfikowac plik");
      }
      const fr = new FileReader();
      fr.addEventListener("load", () => {
        this.imageUrl = fr.result;
      });
      fr.readAsDataURL(file);
      this.image = file;
    }
  }
};
</script>
