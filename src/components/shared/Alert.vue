 <template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
        <v-alert
          v-model="show"
          border="left"
          close-text="Close Alert"
          
          dark
          dismissible
          type="error"
          @input="onClose"
          
        > {{text}}</v-alert>
    </v-flex>
  </v-layout>
</template>
 <script>
export default {
    props: ['text'],
  data() {
    return {
      show: true
    };
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  },

};
</script>