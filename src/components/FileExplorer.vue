<template>
  <input v-model="curPath" placeholder="/" />
  <p>curPath: {{ curPath }}</p>
  <p>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(token, key) in curPathTokens"
        :key="key"
        :path="key"
        
        @click="changeDir($event, key)"
      >
        <!-- :to="key" -->
        {{ token }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </p>
  <el-table
    :data="getTableData()"
    height="250"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    @row-dblclick="handleRowDoubleClick"
  >
    <el-table-column fixed type="selection" width="55"> </el-table-column>
    <!-- <el-table-column label="Type" width="50">
      <template #default="scope">
        <i :class="showFileIcon(scope.row.isDir)"></i>
      </template>
    </el-table-column> -->
    <el-table-column label="Name" sortable>
      <template #default="scope">
        <i :class="showFileIcon(scope.row.isDir)"></i>
        <span style="margin-left: 5px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="name" sortable label="Name"> </el-table-column> -->
    <el-table-column sortable label="Date modified" width="200">
      <template #default="scope">
        <span>{{ getTimeString(scope.row.mtime) }}</span>
      </template>
    </el-table-column>
    <el-table-column sortable label="Size" width="100">
      <template #default="scope">
        <span>{{ scope.row.isDir ? "" : getFileSize(scope.row.size) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { ElMessage } from "element-plus";
console.log(window.electron);
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
      curPath: "/",
      curPathTokens: { "/": "🏠" },
      // tableData: window.electron.getDirEntries(this.curPath),
      multipleSelection: [],
      lastTableData: [],
    };
  },
  methods: {
    getTableData() {
      try {
        let entries = window.electron.getDirEntries(this.curPath);
        this.lastTableData = entries;
        return entries;
      } catch (e) {
        console.log("getDirEntries failed: ", e.toString());
        ElMessage({
          showClose: true,
          message: "路径非法: " + e.toString(),
          type: "error",
        });
        // return this.lastTableData;
      }
    },
    showFileIcon(isDir) {
      if (isDir) {
        return "el-icon-folder";
      }
      return "el-icon-document";
    },
    getFileSize(size) {
      let mbSize = size / 1024 / 1024;
      if (mbSize < 1) {
        return (size / 1024).toFixed(2).toString() + "KB";
      } else {
        return mbSize.toFixed(2).toString() + "MB";
      }
    },
    getTimeString(datetime) {
      return datetime
        .toISOString()
        .replace(/T/, " ") // replace T with a space
        .replace(/\..+/, ""); // delete the dot and everything after
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      //   for (const element of val) {
      //     console.log(element.name);
      //   }
      console.log(this.multipleSelection);
    },
    handleRowDoubleClick(row, column, event) {
      if (row.isDir) {
        this.curPath = row.path;
        this.curPathTokens = this.getPathTokens(this.curPath);
      } else {
        window.electron.exec(row.path);
      }
      // console.log(row);
      console.log(column);
      console.log(event);
    },
    getPathTokens(path) {
      let tokens = { "/": "🏠" };
      if (this.curPath != undefined) {
        let names = path.split("\\");
        let ppath = "";
        for (const name of names) {
          if (name.trim() == "") continue;
          if (name.indexOf(":") == -1) {
            ppath += "\\" + name;
            tokens[ppath] = name;
          } else {
            ppath += name;
            let diskRootPath = name + "\\";
            tokens[diskRootPath] = name;
          }
          console.log(ppath);
        }
        console.log(tokens);
      }
      return tokens;
    },
    changeDir(event, path) {
      console.log("change dir: " + path);
      this.curPath = path;
    },
  },
  watch: {
    // whenever curPath changes, this function will run
    curPath(newPath, oldPath) {
      this.curPathTokens = this.getPathTokens(this.curPath);
      console.log(newPath, oldPath);
    },
  },
};
</script>

