<template>
  <div class="container context_top">
    <h1>Deal</h1>
    <!--
        内置过渡动画
        Layout 布局
        Card 卡片 + Border边框
        Steps 步骤条
        Timeline 时间线
        表单 + Table表格 ？
        响应式
    -->
    <div class="deal_card">
      <el-card>
        <p>firstname Lastname</p>
        <p>Company</p>
        <p>phone</p>
        <p>mail</p>
        <a>see more</a>
      </el-card>
      <el-card>
        <p>Product</p>
        <p class="deal_num">CHRG（ex:2000）</p>
        <p class="deal_num">FFP2（ex:600）</p>
        <a>see more</a>
      </el-card>
    </div>
    <!--步骤条-->
    <div class="deal_step">
      <el-steps :active="active" finish-status="success" align-center>
        <!-- error是红色，success是绿色，finish是主题色，wait是等待下一步的灰色，process是--><!--success process wait-->
        <el-step title="Quote" :description="status_1 === 'process' ? 'waiting/to do' : ''" :status="status_1"></el-step><!---->
        <el-step title="Bill 1" :description="status_2 === 'process' ? 'waiting/to do' : ''" :status="status_2"></el-step><!---->
        <el-step title="Shipping" :description="status_3 === 'process' ? 'waiting/to do' : ''" :status="status_3"></el-step><!---->
        <el-step title="Bill 2" :description="status_4 === 'process' ? 'waiting/to do' : ''" :status="status_4"></el-step><!---->
        <el-step title="Closed" :description="status_5 === 'process' ? 'waiting/to do' : ''" :status="status_5"></el-step><!---->
      </el-steps>
    </div>
    <!--表单+表格-->
    <div class="deal_form">
      <h1>Generer le devis</h1>
      <table>
        <tbody>
        <tr>
          <td class="deal_left">
            <div class="deal_title">
              <span>Masques Chirurgicaux</span>
              <el-input v-model="num1" placeholder="请输入内容"></el-input>
            </div>
          </td>
          <td class="deal_middle"></td>
          <td class="deal_right">Prix total</td>
        </tr>
        <tr>
          <td class="deal_left">
            Prix Unitaire
            <el-input v-model="num2" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_middle">Remise %
            <el-input v-model="num3" placeholder="请输入内容"></el-input>
          </td >
          <td class="deal_right">1970$</td>
        </tr>
        <tr>
          <td class="deal_left">Prix Livraison
            <el-input v-model="num2" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_middle">Remise %
            <el-input v-model="num3" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_right">250$</td>
        </tr>
        </tbody>
      </table>
      <table>
        <tbody>
        <tr>
          <td class="deal_left">
            <div class="deal_title">
              <span>Masques Chirurgicaux</span>
              <el-input v-model="num1" placeholder="请输入内容"></el-input>
            </div>
          </td>
          <td class="deal_middle"></td>
          <td class="deal_right">Prix total</td>
        </tr>
        <tr>
          <td class="deal_left">
            Prix Unitaire
            <el-input v-model="num2" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_middle">Remise %
            <el-input v-model="num3" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_right">1970$</td>
        </tr>
        <tr>
          <td class="deal_left">Prix Livraison
            <el-input v-model="num2" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_middle">Remise %
            <el-input v-model="num3" placeholder="请输入内容"></el-input>
          </td>
          <td class="deal_right">250$</td>
        </tr>
        <tr>
          <td class="deal_left"></td>
          <td class="deal_middle">TOTAL HT</td>
          <td class="deal_right">3510$</td>
        </tr>
        <tr>
          <td class="deal_left"></td>
          <td class="deal_middle">TOTAL TTC</td>
          <td class="deal_right">4212$</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="deal_button">
      <el-button @click.stop.prevent="next()" type="primary">Generer</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'DealOne',
  data () {
    return {
      active: 0,
      num1: 2000,
      num2: 0.86,
      num3: 0,
      status_1: '',
      status_2: '',
      status_3: '',
      status_4: '',
      status_5: ''
    }
  },
  created () {
    if (this.active === 0) {
      this.status_1 = 'process'/*  */
      this.status_2 = 'wait'
      this.status_3 = 'wait'
      this.status_4 = 'wait'
      this.status_5 = 'wait'
    }
  },
  methods: {
    next () {
      /* if (this.active++ > 4) this.active = 1 */
      if (this.active === 0) {
        this.active += 2
      } else {
        this.active++
      }
      if (this.active === 1) {
        this.status_1 = 'process'/*  */
        this.status_2 = 'wait'
        this.status_3 = 'wait'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (this.active === 2) {
        this.status_1 = 'success'
        this.status_2 = 'process'
        this.status_3 = 'wait'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (this.active === 3) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'process'
        this.status_4 = 'wait'
        this.status_5 = 'wait'
      } else if (this.active === 4) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'success'
        this.status_4 = 'process'
        this.status_5 = 'wait'
      } else if (this.active === 5) {
        this.status_1 = 'success'
        this.status_2 = 'success'
        this.status_3 = 'success'
        this.status_4 = 'success'
        this.status_5 = 'process'
      }
    }
  }
}
</script>

<style lang="scss">
  .deal_left .deal_middle{
    width:40%;
  }
  .deal_right{
    width:20%;
  }
  .context_top{
    margin-top:60px;
  }
  .deal_card{
    display: flex;
    justify-content: space-between;
    margin-top:20px;
    @media (max-width: 767px) {
      display: block;
      margin-bottom:20px;
    }
    .el-card{
      margin-top:20px;
    }
    .deal_num{
      margin-left:1.2rem;
      margin-right:1rem;
    }
    a{
      display:inline-block;
      text-align: right;
      margin-left:11rem;
    }
  }
  .deal_step{
    margin-top:50px;
    .el-step__line{
      top:9px!important;
      border-bottom:2px dashed #BDC8D6;
      background-color:white;
    }
    .el-step__line-inner{
      border-width:2px!important;
      border-color: black;
      transition-delay: 0ms!important;
    }
    .el-step__head.is-success{
      color:black;
      border-color:black;
    }
    .el-step__title.is-success{
      color:black;
    }
    /*.el-step__description.is-success{ !* is-process ??? *!
      color:black;
      width:100px;
      height:100px;
      border-bottom: 50px solid blue;
    }*/
    .el-step__description.is-process{
      color:white;
      background-color:#303133;
      padding-top:10px;
      margin-top:10px;
      position:relative;
      border-radius: 4px;
      height:30px;
      // width:60px;
    }
    .el-step__description.is-process:before{
      content:"";
      width: 0;
      height: 0;
      border-style:solid;
      border-width:10px;
      border-color:transparent transparent #303133 transparent;
      position:absolute;
      top:-20px;
      margin-left:16%;
    }
    @media (max-width:421px) {
      .el-step__description.is-process:before{
        // margin-left:44%;
      }
    }
    .el-step__description{}
  }
  .deal_form{
    margin:130px 0 40px 0;
    h1{
      margin:10px 0 25px 0;
    }
    table{/* table可以设置margin但不可以设置padding */
      margin-top:30px;
      @media ((max-width: 767px)) {
        width:100%;
      }
      .deal_title{
        span{
          font-size:1.2rem;
          font-weight:600;
          padding-right:0.8rem;
        }
        .el-input{
          width:40%;
          @media (max-width: 767px){
            width:100%;
          }
        }
      }
      tr{/* tr、td可以设置padding但不可以设置margin */
        td{
          padding-bottom:20px;
          padding-right:20px;
          @media (max-width: 767px){
            padding-right:10px;
          }
          .el-input{
            margin-top:10px;
          }
        }
      }
    }
  }

  .el-tooltip__popper {
    pointer-events: none !important;
    color:black;
  }
</style>
