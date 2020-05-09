<template>
  <div class="container">
    <vue-headful
      title="MedicalHero - Page non trouvée"
      />
    <div class="thank">
      <div class="thank_content">
        <section class="section1">
          <h2 class="title">Erreur 404 - Page non existante</h2>
        </section>
        <p>Si cette page existe vraiment, nous sommes désolé de la gêne occasionée.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Thank'
    }
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
