<template>
  <div>
    <form action="http://52.163.245.77:3000/" method="post" id="uploadF">
      <div>上传文件：</div>
      添加：<input name="name" type="text"/>
      <input name="file" type="file" id="uploadFile" value="" style="display: inline"/>
      <input type="submit" value="登录"/>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Test3'
}
</script>

<style scoped>

</style>
