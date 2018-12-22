<template>
  <div class="picked fadeInUp animated">
    <img :src="selected ? selected.photo.url : data.memes[0].photo.url" />
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
</template>
<script>
export default {
  name: 'Picked',
  props: ['data', 'selected'],
  data () {
    return {
      copied: false
    }
  },
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

<script>
export default {
  name: "Picked",
  props: ["data", "selected"],
  data() {
    return {
      copied: false
    };
  },
  methods: {
    onCopy: function(e) {
      this.copied = true;
      window.setTimeout(() => {
        this.copied = false;
      }, 2000);
    }
  }
};
</script>
