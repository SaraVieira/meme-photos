<template>
  <article>
    <ApolloQuery :query="require('../graphql/getMemes.gql')">
      <template slot-scope="{ result: { loading, error, data }, isLoading }">
        <div
          v-if="loading || isLoading"
          class="loading apollo"
        >Loading...</div>
        <div
          v-else-if="error"
          class="error apollo"
        >An error occured</div>
        <div
          v-else-if="data && shuffle(data.memes)"
          class="container"
        >
          <div class="memes">
            <article
              v-for="meme in data.memes"
              :key="meme.id"
              v-on:click="selected = meme"
            >
              <Meme :meme="meme.photo" />
            </article>
          </div>
          <div class="picked">
            <img
              v-if="!selected"
              :src="data.memes[0].photo.url"
            />
            <img
              v-if="selected"
              :src="selected.photo.url"
            />
          </div>
        </div>
        <div
          v-else
          class="no-result apollo"
        >No result :(</div>
      </template>
    </ApolloQuery>
  </article>
</template>

<script>
import Meme from "./Meme";
export default {
  data() {
    return {
      photoshoped: null,
      selected: null
    };
  },
  components: {
    Meme
  },

  methods: {
    shuffle: function(array) {
      var currentIndex = array.length;
      let temporaryValue = null;
      let randomIndex = null;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  },
  computed: {
    photoshopedComputer: {
      get: function() {
        return this.photoshoped;
      },
      set: function(newValue) {
        const value = newValue ? true : null;
        this.photoshoped = value;
      }
    }
  }
};
</script>
<style>
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: 0.25s ease-in-out;
  outline: none;
}

.memes {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

.container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  max-width: 100%;
  margin: auto;
  width: 1180px;
  margin-bottom: 50px;
}
</style>
