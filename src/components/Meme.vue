<template>
  <article>
    <div role="img" aria-label="Primer movie" class="grow aspect-ratio--4x6 " :style="`background: url(${meme.url}) no-repeat center center; background-size: cover;`"></div>
    <div class="hover pa2">
      <div class="measure relative">
        <label for="meme" class=" f6 b mb2">Image URL
        </label>
        <input class="input-reset ba b--black-20 pa2 mb2 w-100" type="text" id="meme" :value="meme.url">
        <button class="f6 link ph3 pv2 mb2 dib white bg-black copy pointer" type="button" v-clipboard:copy="meme.url" v-bind:class="{'bg-green ' : copied }" v-clipboard:success="onCopy">
          {{copied ? 'Copied!' : 'Copy!'}}
        </button>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  data () {
    return {
      copied: false
    }
  },
  name: 'Meme',
  props: ['meme'],
  methods: {
    onCopy: function (e) {
      this.copied = true
      window.setTimeout(() => { this.copied = false }, 2000)
    }
  }
}
</script>
<style lang="scss" scoped>
.copy {
  float: right;
  position: absolute;
  right: 1px;
  height: 34px;
  margin-top: 1px;
  border: none;
}

.meme {
  &:hover .hover {
    opacity: 1;
  }

  .hover {
    opacity: 0;
    width: 100%;
    height: 100%;
    transition: opacity 200ms ease-out;
    top: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5);
  }
}
</style>
