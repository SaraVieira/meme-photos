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
          <div class="picked fadeInUp animated">
            <img
              v-if="!selected"
              :src="data.memes[0].photo.url"
            />
            <img
              v-if="selected"
              :src="selected.photo.url"
            />
            <div class="input-container">
              <label
                for="meme"
                class=" f6 b mb2"
              >Image URL
              </label>
              <input
                class="input-reset ba b--black-20 pa2 mb2 w-100"
                type="text"
                id="meme"
                :value="selected ? selected.photo.url : data.memes[0].photo.url"
              >
              <button
                class="f6 link ph3 pv2 mb2 dib white bg-black copy pointer"
                type="button"
                v-clipboard:copy="selected ? selected.photo.url : data.memes[0].photo.url"
                v-bind:class="{'bg-green ' : copied }"
                v-clipboard:success="onCopy"
              >
                {{copied ? 'Copied!' : 'Copy!'}}
              </button>
            </div>

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
      selected: null,
      copied: false
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

      while (currentIndex !== 0 && !this.called) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      this.called = true;
      return array;
    },
    onCopy: function(e) {
      this.copied = true;
      window.setTimeout(() => {
        this.copied = false;
      }, 2000);
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
<style lang="scss">
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

.input-container {
  position: relative;

  button {
    position: absolute;
    top: 0;
    left: 100%;
    transform: translateX(-100%) translateY(100%);
    margin-top: -5px;
    border-radius: 0 2px 2px 0;
    border: none;
    height: 45px;
    width: 20%;
  }

  input {
    padding: 12px 25px;
    box-shadow: -1px 1px 9px 0 rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    border: none;
    font-size: 19px;
    padding-right: 21%;
  }

  label {
    margin: 20px 0;
    display: block;
    font-size: 18px;
  }
}

.picked img {
  border-radius: 2px;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
