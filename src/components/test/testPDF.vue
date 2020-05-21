<template><!--embed/object 在线路径且pc端可以显示, iframe在线路径pc+移动-->
  <div class="special"><!--pdf.js / PDFObject-->
    <div style="width:60%">
      <button @click="open()">查看合同</button>
      <!--<embed src="https://s3.amazonaws.com/dq-blog-files/pandas-cheat-sheet.pdf" width="800px" height="2100px">-->
      <iframe :src="url" style="width: 100%;height: 800px;border: none;"></iframe>
      <object v-if="show" width="100%" height="1200px" :data="url"></object>

    </div>
    <div id="pdf-viewer">kkkk</div>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist'
import pdf from 'pdfobject'
const { PDFObject } =require('../../assets/js/pdfobject')
export default {
  data () {
    return {
      show: false,
      url: 'https://s3.amazonaws.com/dq-blog-files/pandas-cheat-sheet.pdf'
    }
  },
  beforeMounted() {
    this.$nextTick(function () {
      pdf.embed("../../assets/pdf/zhouzhou.pdf", "#pdf_viewer");
    })
  },
  mounted() {
    PDFObject.embed("../../assets/pdf/zhouzhou.pdf", "#pdf_viewer")
  },
  methods: {
    open () {
      this.show = !this.show
    }
  }
}
</script>
<style scoped>
  .special{
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    margin-top:100px;
  }
</style>
