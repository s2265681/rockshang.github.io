<template>
  <div id="main">

  </div>
</template>

<script>
  export default {
    mounted:function(){
     document.getElementsByTagName("body")[0].className="body_back";
    },
    beforeDestroy: function() {
      document.body.removeAttribute("class","body_back");
    }
  }
</script>

<style>
#main {
  height:100%;
  
}
.body_back{
  background :linear-gradient(#fae1b4 ,#ee8b51)
  }
</style>
