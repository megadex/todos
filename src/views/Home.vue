<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Todos msg="Todos"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Todos from '@/components/Todos.vue'

export default {
  name: 'Home',
  components: {
    Todos
  }
}
</script>
