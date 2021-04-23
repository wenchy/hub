<template>
  <input v-model="curPath" placeholder="/" />
  <p>curPath is: {{ curPath }}</p>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(token, key) in curPathTokens"
      :key="key"
      :path="key"
      :to="key"
      @click="changeDir($event, key)"
    >
      {{ token }}
    </el-breadcrumb-item>
  </el-breadcrumb>
  <el-table
    :data="getTableData()"
    height="250"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    @row-dblclick="handleRowDoubleClick"
  >
    <el-table-column fixed type="selection" width="55"> </el-table-column>
    <el-table-column label="Type" width="50">
      <template #default="scope">
        <i :class="showFileIcon(scope.row.isDir)"></i>
        <!-- <span style="margin-left: 10px">{{ scope.row.isDir }}</span> -->
      </template>
    </el-table-column>
    <!-- <el-table-column label="Name" sortable>
      <template #default="scope">
        <i :class="showType(scope.row.isDir)"></i>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column> -->
    <el-table-column prop="name" sortable label="Name"> </el-table-column>
    <!-- <el-table-column prop="size" label="Size"> </el-table-column> -->
    <el-table-column prop="mtime" sortable label="Date modified">
    </el-table-column>
  </el-table>
</template>

<script>
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
      curPathTokens: { "\\": "首页" },
      // tableData: window.electron.getDirEntries(this.curPath),
      multipleSelection: [],
    };
  },
  methods: {
    getTableData() {
      return window.electron.getDirEntries(this.curPath);
    },
    showFileIcon(isDir) {
      if (isDir) {
        return "el-icon-folder";
      }
      return "el-icon-document";
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
      // console.log(column);
      // console.log(event);
    },
    getPathTokens(path) {
      let tokens = { "\\": "首页" };
      if (this.curPath != undefined) {
        let names = path.split("\\");
        let ppath = "";
        for (const name of names) {
          if (name.trim() == "") continue;
          ppath = ppath.concat("\\" + name);
          tokens[ppath] = name;
          console.log(ppath);
        }
        console.log(tokens);
        return tokens;
      }
      return tokens;
    },
    changeDir(event, path) {
      this.curPath = path;
    },
  },
};
</script>

