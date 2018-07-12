<template>
  <article>
    <ApolloQuery :query="require('../graphql/getMemes.gql')" :variables="{ name }">
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data.memes">
          <article v-for="meme in data.memes" :key="meme.id" class="fl w-50 w-25-l link overflow-hidden relative meme sans-serif">
            <Meme :meme="meme" />
          </article>
        </div>
        <div v-else class="no-result apollo">No result :(</div>

      </template>
    </ApolloQuery>
  </article>
</template>

<script>
import Meme from './Meme'
export default {
  components: {
    Meme
  }
}
</script>
