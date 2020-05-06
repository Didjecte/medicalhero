<template>
  <div class="container">
    <div class="thank">
      <div class="thank_content">
        <section class="section1">
          <h2 class="title">Nous avez bien reçu votre demande</h2>
        </section>
        <section class="section2">
          <el-row type="flex" align="middle" justify="center">
            <el-col :sm="5" :xs="10">
              <img :src="require('../assets/images/medicalHeroLogo.png')" class="imgLogo">
            </el-col>
            <el-col :sm="14" :xs="14">
          <b>Commande:</b>
          <div v-if="$route.query.chrg">-&nbsp;&nbsp;<span>{{$route.query.chrg}}</span>&nbsp;&nbsp;masques chirugicaux</div><!--医用数量-->
          <div v-if="$route.query.ffp2">-&nbsp;&nbsp;<span>{{$route.query.ffp2}}</span>&nbsp;&nbsp;masques ffp2</div><!--ffp2数量-->
          <div v-if="$route.query.express_chrg">-&nbsp;&nbsp;Service Express: <span>{{$route.query.express_chrg}}</span>&nbsp;&nbsp;masques chirurgicaux</div><!---->
          <div v-if="$route.query.express_ffp2">-&nbsp;&nbsp;Service Express: <span>{{$route.query.express_ffp2}}</span>&nbsp;&nbsp;masques ffp2</div><!---->
            </el-col>
          </el-row>
        </section>
          <p>Vous recevrez votre devis sous 24h, il est possible que nous vous contactions pour plus de précisions.</p>

        <section class="section3"></section>
        <section class="section4">
          <div>Un email récapitulatif vous a été envoyé.</div><i class="el-icon-s-promotion" style="font-size:25px"></i>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Thank',
      prevRoute: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.prevRoute = from.path
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      if (this.prevRoute !== '/devis') {
        this.$router.push('/')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.thank{
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3.5rem 0;
  .section4{
    margin-top:3rem;
    font-size:1.25rem;
    font-weight: bold;
    text-align:center;
  }
}

.imgLogo{
  height: 120px;
  display: block;
  margin: 0 auto;
}

.title {
  margin-bottom: 40px;
}

</style>
