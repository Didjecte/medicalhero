<template>
  <div class="container userHome">
    <vue-headful
      title="MedicalHero - Dashboard"
    />
    <h1>voir toutes les commandes</h1>
    <!--下面的两个card部分-->
    <div class="userDeal">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <div>
            <p>COMMANDE EFFECTUÉE LE :</p>
            <p>avril 2020</p>
          </div>
          <div>
            <el-tooltip class="item" placement="bottom" effect="dark"><!--effect="dark" content="Bottom Center 提示文字"-->
              <template slot="content">
                <p>Name Surname</p>
                <p>Street</p>
                <p>Complement</p>
                <p>CITY, Zip</p>
                <p>Phone</p>
                <p>Mail</p>
              </template>
              <p>LIVRAISON À :</p>
            </el-tooltip>
            <!--<p>LIVRAISON À :</p>
            <p>avril 2020</p>-->
          </div>
          <div>
            <p>N° DE COMMANDE :</p>
            <p>avril 2020</p>
          </div>
        </div>
        <!--<div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>-->
        <div class="top_step">
          <el-steps :active="active" finish-status="success" align-center>
            <!-- error是红色，success是绿色，finish是主题色，wait是等待下一步的灰色，process是--><!--success process wait-->
            <el-step title="Quote" :description="status_1 === 'process' ? desc : ''" :status="status_1"></el-step><!---->
            <el-step title="Bill 1" :description="status_2 === 'process' ? desc : ''" :status="status_2"></el-step><!---->
            <el-step title="Shipping" :description="status_3 === 'process' ? desc : ''" :status="status_3"></el-step><!---->
            <el-step title="Bill 2" :description="status_4 === 'process' ? desc : ''" :status="status_4"></el-step><!---->
            <el-step title="Closed" :description="status_5 === 'process' ? desc : ''" :status="status_5"></el-step><!---->
          </el-steps>
          <!--<el-steps :active="1">
            <el-step title="步骤 1" description="11"></el-step>
            <el-step title="步骤 2" description="111"></el-step>
            <el-step title="步骤 3" description="11"></el-step>
          </el-steps>-->
          <div class="admin_position">
            <div>
              <div>Livraison Standard(7-12j): </div>
              <p class="text-indent:30px;">-	2000 masques chirurgicaux: 10 avril 2020</p>
              <P class="text-indent:30px;">-	600 masques ffp2: 10 avril 2020</P>
              <div>Livraison Express (2j): </div>
              <p class="text-indent:30px;">-	2000 masques chirurgicaux: 10 avril 2020</p>
              <p class="text-indent:30px;">-	600 masques ffp2: 10 avril 2020</p>
            </div>
            <div>
              <p>DOCUMENTS:</p>
              <p>Devis</p>
              <p>Facture d’accompte</p>
              <p>Facture de solde</p>
            </div>

          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>COMPLÉTEZ</span>
          <span>CES</span>
          <span>INFORMATIONS</span>
          <span>POUR</span>
          <span>FINALISER</span>
          <span>LA</span>
          <span>COMMANDE</span>
        </div>
        <!--<div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>-->
        <div style="height: 850px;" class="bottom_step">
          <el-steps direction="vertical" :active="active2"  finish-status="success"><!--这一部分可能要用到vue的用域插槽-->
            <el-step title="Bon pour accord :" :status="status_6">
              <template slot="description">
                <el-upload
                  class="upload-demo"
                  drag
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <h4>UPLOAD</h4>
              </template>
            </el-step>
            <el-step title="Adresse de livraison  Modifier" :status="status_7">
              <template slot="description">
                <el-card>
                  <p>Name Surname</p>
                  <p>Street</p>
                  <p>Complement</p>
                  <p>CITY,zip</p>
                  <p>Phone</p>
                  <p>Mail</p>
                </el-card>
              </template>
            </el-step>
            <el-step title="Adresse de facturation  Modifier" :status="status_8">
              <template slot="description">
                <el-card>
                  <p>Name Surname</p>
                  <p>Street</p>
                  <p>Complement</p>
                  <p>CITY,zip</p>
                  <p>Phone</p>
                  <p>Mail</p>
                </el-card>
              </template>
            </el-step>
          </el-steps>
        </div>
      </el-card>
      <!--Step步骤条-->
      <!--Timeline时间线-->
      <el-button type="primary" @click.stop.prevent="next()">Finaliser la commande</el-button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'UserHome',
  data () {
    return {
      active: 2,
      num1: 2000,
      num2: 0.86,
      num3: 0,
      status_1: '',
      status_2: '',
      status_3: '',
      status_4: '',
      status_5: '',
      desc: 'waiting/to do',
      active2: 1,
      status_6: '',
      status_7:'',
      status_8:''
    }
  },
  created () {
    if (this.active === 2) {
      this.status_1 = 'success'
      this.status_2 = 'process'
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
      /* 下一个step部分 */
      this.active2 += 1
      if (this.active2 === 1) {
        this.status_6 = 'process'/*  */
        this.status_7 = 'wait'
        this.status_8 = 'wait'
      } else if (this.active2 === 2){
        this.status_6 = 'success'/*  */
        this.status_7 = 'process'
        this.status_8 = 'wait'
      } else {
        this.status_6 = 'success'/*  */
        this.status_7 = 'success'
        this.status_8 = 'process'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  margin:60px 0 30px 0;
}
.clearfix{
  display:flex;
  justify-content: space-between;
  @media (max-width: 767px){
    flex-direction: column;
  }
}
.box-card{
  margin-bottom:60px;
}
.admin_position{
  display: flex;
  justify-content: space-between;
}
</style>
<style lang="scss">
  .userHome{
    .el-step__description{
      width:70%;
    }
    .el-upload-dragger{
      width:110%;
    }
  }
  .top_step{
    margin-top:50px;
    .el-step__line{
      height:1px!important;
      top:9px!important;
      border-bottom:2px dashed #BDC8D6;
      background-color:white;
    }
    .el-step__line-inner{
      border-width:1.5px!important;
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
    .el-step__description.is-process{
      color:white;
      background-color:#303133;
      padding-top:10px;
      margin-top:10px;
      position:relative;
      border-radius: 4px;
      height:30px;
    }
    .el-step__description.is-process:before{
      content:"";
      width: 0;
      height: 0;
      border-style:solid;
      border-width:10px;
      border-color:transparent transparent #303133 transparent;
      position:absolute;
      top:-19px;
      margin-left:10%;
    }
    @media (max-width:421px) {
      .el-step__description.is-process:before{
        // margin-left:44%;
      }
    }
  }
  .bottom_step{
    .el-step__line{
      width:1px!important;
      /*top:9px!important;*/
      border-right:2px dashed #BDC8D6;
      background-color:white;
    }
    .el-step__line-inner{
      border-width:1.4px!important;
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
  }
</style>
