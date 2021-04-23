<template>
  <Test msg="Welcome to Test page"/>
  <hr/>
  <FileExplorer msg="custom file explorer component"/>
  <hr/>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
import FileExplorer from './components/FileExplorer.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Test,
    FileExplorer
  }
}
</script>


