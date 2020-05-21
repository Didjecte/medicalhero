<template>
  <div>
    <p>合同预览</p>
    <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
  </div>
</template>

<script>
// import PDFJS from 'pdfjs-dist'
import { PDFJS, pdfjsLib } from 'pdfjs-dist'
// const Base64 = require('js-base64').Base64
export default {
  data () {
    return {
      title: '查看协议',
      pdfDoc: null,
      pages: 0
    }
  },
  methods: {
    // 初始化pdfjs
    initThePDFJSLIB: function () {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.js'
    },
    _renderPage (num) {
      this.pdfDoc.getPage(num).then(page => {
        const canvas = document.getElementById('the-canvas' + num)
        const ctx = canvas.getContext('2d')
        const dpr = window.devicePixelRatio || 1
        const bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1
        const ratio = dpr / bsr
        const viewport = page.getViewport(
          screen.availWidth / page.getViewport(1).width
        )
        canvas.width = viewport.width * ratio
        canvas.height = viewport.height * ratio
        canvas.style.width = viewport.width + 'px'
        canvas.style.height = viewport.height + 'px'
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext)
        if (this.pages > num) {
          this._renderPage(num + 1)
        }
      })
    },
    _loadFile (url) {
      PDFJS.getDocument(url).then(pdf => {
        this.pdfDoc = pdf
        this.pages = this.pdfDoc.numPages
        this.$nextTick(() => {
          this._renderPage(1)
        })
      })
    }
  },
  mounted () {
    this.initThePDFJSLIB()
    document.title = this.title
    const url = 'PDF链接地址'
    console.log(url)
    this._loadFile(url)
  }
}
</script>

<style scoped>
  canvas {
    display: block;
    border-bottom: 1px solid black;
  }
</style>
