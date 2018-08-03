<template>
  <article>
    <div class="toggles">
      <input type="checkbox" name="checkbox" id="checkbox" class="ios-toggle" v-model="photoshopedComputer"/>
      <label for="checkbox" class="checkbox-label" data-off="No Photoshop" data-on="Photoshoped"></label>
    </div>
    <ApolloQuery :query="require('../graphql/getMemes.gql')" :variables="{ photoshoped }">
      <template slot-scope="{ result: { loading, error, data }, isLoading }">
        <div v-if="loading || isLoading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occured</div>
        <div v-else-if="data && data.memes">
          <article v-for="meme in data.memes" :key="meme.id" class="fl w-50 w-33-l link overflow-hidden relative meme sans-serif">
            <Meme :meme="meme.photo" />
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
  data () {
    return {
      photoshoped: null
    }
  },
  components: {
    Meme
  },
  computed: {
    photoshopedComputer: {
      get: function () {
        return this.photoshoped
      },
      set: function (newValue) {
        const value = newValue ? true : null
        this.photoshoped = value
      }
    }
  }
}
</script>
<style>
  *,*:before,*:after {
    box-sizing:border-box;
    margin:0;
    padding:0;
    transition:.25s ease-in-out;
    outline:none;
  }
  .toggles {
    width:60px;
    margin:50px auto;
    text-align:center;
  }
  .ios-toggle,.ios-toggle:active {
    position:absolute;
    top:-5000px;
    height:0;
    width:0;
    opacity:0;
    border:none;
    outline:none;
  }
  .checkbox-label {
    display:block;
    position:relative;
    padding:10px;
    margin-bottom:20px;
    font-size:12px;
    line-height:16px;
    width:100%;
    height:36px;
    border-radius:18px;
    background:#f8f8f8;
    cursor:pointer;
  }
  .checkbox-label:before {
    content:'';
    display:block;
    position:absolute;
    z-index:1;
    line-height:34px;
    text-indent:40px;
    height:36px;
    width:36px;
    border-radius:100%;
    top:0px;
    left:0px;
    right:auto;
    background:white;
    box-shadow:0 3px 3px rgba(0,0,0,.2),0 0 0 2px #dddddd;
  }
  .checkbox-label:after {
    content:attr(data-off);
    display:block;
    position:absolute;
    z-index:0;
    top:0;
    left:-300px;
    padding:10px;
    height:100%;
    width:300px;
    text-align:right;
    color:#bfbfbf;
    white-space:nowrap;
  }
  .ios-toggle:checked + .checkbox-label {
    box-shadow:inset 0 0 0 20px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);
  }
  .ios-toggle:checked + .checkbox-label:before {
    left:calc(100% - 36px);
    box-shadow:0 0 0 2px transparent,0 3px 3px rgba(0,0,0,.3);
  }
  .ios-toggle:checked + .checkbox-label:after {
    content:attr(data-on);
    left:60px;
    width:36px;
  }

  .ios-toggle + .checkbox-label {
    box-shadow:inset 0 0 0 0px rgba(19,191,17,1),0 0 0 2px #dddddd;
  }
  .ios-toggle:checked + .checkbox-label {
    box-shadow:inset 0 0 0 18px rgba(19,191,17,1),0 0 0 2px rgba(19,191,17,1);
  }
  .ios-toggle:checked + .checkbox-label:after {
    color:rgba(19,191,17,1);
  }
</style>
