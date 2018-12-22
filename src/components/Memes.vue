<template>
  <article>
    <ApolloQuery :query="require('../graphql/getMemes.gql')">
      <template slot-scope="{ result: { loading, error, data }, isLoading }">
        <Loading v-if="loading || isLoading" />
        <div
          v-else-if="error"
          class="error apollo"
        >An error occured</div>
        <main
          v-else-if="data && shuffle(data.memes)"
          class="container"
        >
          <section class="memes">
            <article
              v-for="meme in data.memes"
              :key="meme.id"
              v-on:click="selected = meme"
            >
              <Meme :meme="meme.photo" />
            </article>
          </section>
          <Picked
            :selected="selected"
            :data="data"
          />
        </main>
      </template>
    </ApolloQuery>
  </article>
</template>

<script>
import Meme from './Meme'
import Loading from './Loading'
import Picked from './Picked'
export default {
  data () {
    return {
      selected: false
    }
  },
  components: {
    Meme,
    Loading,
    Picked
  },
  methods: {
    shuffle: function (array) {
      var currentIndex = array.length
      let temporaryValue = null
      let randomIndex = null

      while (currentIndex !== 0 && !this.called) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }

      this.called = true
      return array
    }
  }
}
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
</style>
