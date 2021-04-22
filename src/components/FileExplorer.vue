<template>
  <el-table :data="tableData" height="250" border style="width: 100%">
    <el-table-column prop="name" label="名称"> </el-table-column>
    <el-table-column prop="isDir" label="是否目录"> </el-table-column>
    <el-table-column prop="date" label="修改时间"> </el-table-column>
  </el-table>
</template>

<script>

console.log(window.electron)

export default {
  name: "FileExplorer",
  props: {
    msg: String,
  },
  created() {
    // `this` points to the vm instance
    console.log("count is: " + this.msg);
  },
  data() {
    return {
      counter: 0,
      tableData: window.electron.getDirEntries("/")
    };
  },
};
</script>

