<template>
  <div class="test" style="width:525px;margin: 400px 0 0 500px">
    <el-form :model="goodForm" :rules="goodFormRules" ref="goodFormRef" label-width="140px">
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="商品名字：" prop="name">
            <el-input v-model="goodForm.name"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="商品图片:" class="hotel-logo"><!--:before-upload="uploadform" auto-upload选取文件后立即上传-->
            <el-upload
              prop="file"
              accept=".jpg, .jpeg, .png, .gif"
              :on-change="imageChange"
              :auto-upload="false"
              action="#">
              <el-button size="small" type="primary">点击上传</el-button>
              <span style="color:red;" slot="tip" class="el-upload__tip">只能上传"gif", "jpg", "jpeg", "png"文件</span>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <button @click="upload">提交</button>
    <!--<form action="https://www.baidu.com" method="post">
      用户名：<input type="text" name="username"/><br/>
      密码：<input type="password" name="password"/><br/>
      <input type="file" name="file"/>
      <input type="reset" name="reset"/>
      <input type="submit" value="登录"/>
    </form>-->
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      goodForm: {
        name: '苹果'
      },
      goodFormRules: {},
      images: [],
      fileFormData: null
    }
  },
  methods: {
    imageChange (file, fileList, name) {
      // on-change触发
      this.images[file] = fileList
      console.log('this.images', this.images)
      console.log('file', file)
      console.log('fileList', fileList)
      console.log('name', name)
    },
    upload () {
      const fd = new FormData()
      fd.append('dsc', this.goodForm.name)
      console.log('fd', fd)
      Object.entries(this.images).forEach(file => {
        file[1].forEach(item => {
          fd.append('files', item.raw)
          fd.append(item.name, file[0])
        })
      })
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      console.log('this.fileFormData', this.fileFormData)
      this.$axios.post('', this.fileFormData, config).then(res => {
        console.log(res)
      }).catch(() => {
        this.$message.error('保存失败，请稍后重试')
      })
    }
  }
}
</script>

<style scoped>
</style>
