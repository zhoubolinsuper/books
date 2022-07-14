<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import instance from '@/api/api.js' 
  export default{
    name:"AboutView",
    created(){
      instance.get("/acd").then(res=>{console.log(res)})
    }
  }
</script>
