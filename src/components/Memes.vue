<template>
  <article>
    <ApolloQuery :query="require('../graphql/getMemes.gql')" :variables="{ name }">
      <template slot-scope="{ result: { loading, error, data: { memes } } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="memes" class="cf pa2 flex w-90 center tl-l flex-wrap">
          <article class="bt bb b--black-10" v-for="meme in memes" :key="meme.id">
            <div class="db pv4 ph3 ph0-l no-underline black dim">
              <div class="flex flex-column flex-row-ns">
                <div class="pr3-ns mb4 mb0-ns w-100 w-40-ns">
                  <img :src="meme.image.url" :alt="meme.name" class="db">
                </div>
                <div class="w-100 w-60-ns pl3-ns">
                  <h1 class="f3 fw1 baskerville mt0 lh-title">{{meme.name}}</h1>
                  <p class="f6 f5-l lh-copy">
                    <h1 class="f4 lh-copy tl-l mb1">Use Cases</h1>
                    <ul class="ma0 pa0 list mb2">
                      <li class="lh-copy mb2 mt0" v-for="c in meme.cases" :key="c">{{c}}</li>
                    </ul>
                    <h1 class="f4 lh-copy tl-l mb1">Emojis</h1>
                    <ul class="ma0 pa0 list mb2 flex">
                      <li class="mr1" v-for="e in meme.emoji" :key="e">{{e}}</li>
                    </ul>
                    <div class="measure relative">
                      <label for="name" class=" f6 b mb2">Image URL
                      </label>
                      <input id="url" class="input-reset ba b--black-20 pa2 mb2 w-100" type="text" aria-describedby="name-desc" :value="meme.image.url">
                      <button class="f6 link dim ph3 pv2 mb2 dib white bg-black copy" type="button" v-clipboard:copy="meme.image.url" v-clipboard:success="onCopy">Copy!</button>
                    </div>
                  </p>
                  <p class="f6 lh-copy mv0"> ❤️ {{meme.likes || 0}}</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>

      </template>
    </ApolloQuery>
  </article>
</template>

<script>
export default {
  methods: {
    onCopy: function (e) {
      alert('You just copied: ' + e.text)
    }
  }
}
</script>

<style scoped>
.copy {
  float: right;
  position: absolute;
  right: 1px;
  height: 34px;
  margin-top: 1px;
  border: none;
}
</style>
