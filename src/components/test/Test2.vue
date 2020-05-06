<template>
  <div>
    <input type="file" name="file" class="fileBtn" style="display:inline"/>
    <input type="submit" name="submit" value="上传视频" class="submitBtn" @click="submitVideo"/>
  </div>
</template>

<script>
export default {
  name: 'Test2',
  data () {
    return {}
  },
  methods: {
    submitVideo () {
      var formData = new FormData()
      // append方法中的第一个参数必须和后端接收的字段完全一致
      formData.append('files', document.querySelector('input[type=file]').files[0])
      var options = {
        url: 'api/video/upVideo',
        data: formData,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios(options).then(this.upVideoSucc).catch(this.upVideoFail)
    },
    upVideoSucc (res) {
      console.log('上传成功！')
    },
    upVideoFail () {
      console.log('上传失败！')
    }
  }
}
</script>

<style scoped></style>
