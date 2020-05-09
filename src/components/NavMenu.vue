<template>
  <div style="height:100%">
    <el-header class="header" style="height:60px; padding: 0px 15px 0px 15px">
      <div class="container" style="padding: 0px 0px 0px 0px !important">
        <el-row type="flex" class="row-bg" justify="space-between" align="middle">
          <span style="display:inline-block;">
            <router-link class="logo-text" to="/">
              Stop-covid19.fr
            </router-link>
          </span>
          <!-- not connected -->
          <div v-if="!(this.$store.getters.permission >= 2)">
            <el-menu :default-active="activeIndex"
              :router="true"
              mode="horizontal"
              menu-trigger="click" style="float:right">
              <el-menu-item index="/devis" route="/devis" class="hidden-xs-only">Devis</el-menu-item>
              <el-menu-item index="/login" route="/login" class="hidden-xs-only">Login</el-menu-item>
              <el-submenu index="/" class="hidden-sm-and-up">
                <template slot="title"><el-button plain class="el-icon-more"></el-button></template>
                <el-menu-item index="/devis" route="/devis">Devis</el-menu-item>
                <el-menu-item index="/login" route="/login">Login</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <!-- user -->
          <div v-if="this.$store.getters.permission < 512 && this.$store.getters.permission >= 2">
            <el-menu :default-active="activeIndex2"
              :router="true"
              mode="horizontal"
              menu-trigger="click" style="float:right">
                <el-menu-item index="/devis" route="/devis" class="hidden-xs-only">Devis</el-menu-item>
              <el-menu-item index="/user" route="/user" class="hidden-xs-only">Commandes</el-menu-item>
              <el-menu-item @click="logout" index="/logout" class="hidden-xs-only">Logout</el-menu-item>
              <el-submenu index="/" class="hidden-sm-and-up">
                <template slot="title"><el-button plain class="el-icon-more"></el-button></template>
                <el-menu-item index="/devis" route="/devis">Devis</el-menu-item>
                <el-menu-item index="/user" route="/user">Commandes</el-menu-item>
                <el-menu-item @click="logout" index="/logout">Logout</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
          <!-- admin -->
          <div v-if="this.$store.getters.permission >= 512">
            <el-menu :default-active="activeIndex2"
              :router="true"
              mode="horizontal"
              menu-trigger="click" style="float:right">
              <el-menu-item index="/admin" route="/admin" class="hidden-xs-only">Dashboard</el-menu-item>
              <el-menu-item @click="logout" index="/logout" class="hidden-xs-only">Logout</el-menu-item>
              <el-submenu index="/" class="hidden-sm-and-up">
                <template slot="title"><el-button plain class="el-icon-more"></el-button></template>
                <el-menu-item index="/admin" route="/admin">Dashboard</el-menu-item>
                <el-menu-item @click="logout" index="/logout">Logout</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-row>
      </div>
    </el-header>
    <div style="height:60px;"></div>
    <div style="height:calc(100% - 60px)">
      <simplebar style="height:100%" id="scrollBar">
        <router-view></router-view>
        <el-footer class="color-text-regular">
          Copyright © 2020 - Medical Hero SAS. All rights reserved. <router-link to="/cgv">Condition Générale de Vente</router-link>
        </el-footer>
      </simplebar>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: null,
      activeIndex2: '/admin',
      logo: require('../assets/images/medicalHeroLogo.png')
    }
  },
  computed: {
    connected () {
      return (this.$store.getters.permission >= 2)
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.activeIndex = this.$route.path
      this.activeIndex2 = this.$route.path
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          if (this.$router.currentRoute.path !== '/login') {
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
    }
  },
  watch: {
    $route (to, from) {
      this.activeIndex = to.path
      this.activeIndex2 = to.path
    }
  }
}
</script>

<style lang="scss">
  .header {
    background-color: white;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    position: fixed;
    width: 100%;
    z-index: 2500;
  }

  .logo {
    height: 100%;
    width: auto;
  }

  .logo-text, .logo-text:focus {
    color: #213248 !important;
    text-decoration: none !important;
    font-size: 1.25rem;
  }

  .logo-text:hover{
  color: #6ebcc5 !important;
  text-decoration: none !important;
  }

  .el-submenu__title i {
    display: none;
  }

  .el-submenu__title {
    border-bottom: none !important;
    padding: 0 0 0 0 !important;
  }

  .el-menu--horizontal {
    z-index: 2550 !important;
  }

  .el-footer {
    font-size: 70%;
    font-weight: 400;
    text-align: center;
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
    color: #61758E;
  }
</style>
