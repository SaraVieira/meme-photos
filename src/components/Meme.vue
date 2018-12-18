<template>
  <article class="meme">
    <img :src="meme.url" />
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
      window.setTimeout(() => {
        this.copied = false
      }, 2000)
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
  overflow: hidden;
  overflow: hidden;
  position: relative;
  height: 100px;
  cursor: pointer;

  img {
    width: 200%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

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
