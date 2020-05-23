<template>
  <div class="container">
    <vue-headful
      title="MedicalHero - Devis"
      />
    <div class="thank">
      <div class="thank_content">
        <section class="section1">
          <!-- <img :src="require('../assets/images/medicalHeroLogo.png')" class="imgLogo"> -->
          <h2 class="title">Nous avez bien pris en compte votre demande</h2>
        </section>
        <section class="section2">
          <p>Vous recevrez votre devis sous 24h, il est possible que nous vous contactions pour plus de précisions.</p>
          <span>Vous avez demandé un devis pour:</span>
          <div v-if="$route.query.chrg">-&nbsp;&nbsp;<span>{{$route.query.chrg}}</span>&nbsp;&nbsp;masques chirugicaux</div><!--医用数量-->
          <div v-if="$route.query.ffp2">-&nbsp;&nbsp;<span>{{$route.query.ffp2}}</span>&nbsp;&nbsp;masques ffp2</div><!--ffp2数量-->
          <div v-if="$route.query.express_chrg">-&nbsp;&nbsp;Service Express: <span>{{$route.query.express_chrg}}</span>&nbsp;&nbsp;masques chirurgicaux</div><!---->
          <div v-if="$route.query.express_ffp2">-&nbsp;&nbsp;Service Express: <span>{{$route.query.express_ffp2}}</span>&nbsp;&nbsp;masques ffp2</div><!---->
        </section>

        <section class="section3"></section>
        <section class="section4">
          <div><i class="el-icon-s-promotion" style="font-size:25px"></i> Un email récapitulatif vous a été envoyé.</div>
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
        this.$router.push('/devis')
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
