<template>
  <div :class="layoutClass" class="auth-layout">
    <base-nav
      v-model="showMenu"
      type="light"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main"
      expand="lg"
    >
      <div slot="brand" class="navbar-wrapper">
        <nuxt-link class="navbar-brand" to="/dashboard">
          <h1 class="text-white mt-2">API Mate</h1>
        </nuxt-link>
      </div>

      <template>
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <nuxt-link to="/">
                <img src="/img/brand/green.png" alt="Logo green" />
              </nuxt-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                @click="showMenu = false"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav mr-auto">
          <!-- <li class="nav-item">
            <nuxt-link to="/dashboard" class="nav-link">
              <span class="nav-link-inner--text">Dashboard</span>
            </nuxt-link>
          </li> -->
          <li class="nav-item">
            <nuxt-link to="/login" class="nav-link">
              <span class="nav-link-inner--text">Login</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/register" class="nav-link">
              <span class="nav-link-inner--text">Register</span>
            </nuxt-link>
          </li>
        </ul>
        <hr class="d-lg-none" />
        <ul class="navbar-nav align-items-lg-center ml-lg-auto">
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://www.facebook.com/API.Mate1"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-square"></i>
              <span class="nav-link-inner--text d-lg-none">Facebook</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://discord.com/channels/897845477985382451/897845477985382454"
              target="_blank"
              rel="noopener"
              aria-label="Discord"
            >
              <i class="fab fa-discord"></i>
              <span class="nav-link-inner--text d-lg-none">Discord</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://twitter.com/API-Mate"
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter-square"></i>
              <span class="nav-link-inner--text d-lg-none">Twitter</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://hub.docker.com/u/apimate/"
              target="_blank"
              rel="noopener"
              aria-label="docker"
            >
              <i class="fab fa-docker"></i>
              <span class="nav-link-inner--text d-lg-none">Docker</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://github.com/API-Mate"
              target="_blank"
              rel="noopener"
              aria-label="Github"
            >
              <i class="fab fa-github"></i>
              <span class="nav-link-inner--text d-lg-none">Github</span>
            </a>
          </li>
          <li class="nav-item d-none d-lg-block ml-lg-4">
            <nuxt-link to="/login" class="btn btn-neutral btn-icon">
              <!-- <span class="btn-inner--icon">
                <i class="fas fa-signup mr-2"></i>
              </span> -->
              <span class="nav-link-inner--text">Sign Up Now!</span>
            </nuxt-link>
          </li>
        </ul>
      </template>
    </base-nav>

    <div class="main-content">
      <nuxt></nuxt>
    </div>

    <footer class="py-5" id="footer-main">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <ul class="nav nav-footer">
              <li class="nav-item">
                <a
                  href="https://github.com/API-Mate"
                  class="nav-link"
                  target="_blank"
                  rel="noopener"
                >
                  <i class="fab fa-github"></i>
                  Github</a
                >
              </li>

              <li class="nav-item">
                <a
                  href="https://hub.docker.com/u/apimate/"
                  class="nav-link"
                  target="_blank"
                  rel="noopener"
                >
                  <i class="fab fa-docker"></i>
                  Docker</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://github.com/API-Mate/API-Mate/blob/main/LICENSE"
                  class="nav-link"
                  target="_blank"
                  rel="noopener"
                  >LICENSE</a
                >
              </li>
            </ul>
          </div>
          <div class="col-xl-6 pr-1">
            <div class="copyright text-center text-lg-right text-muted">
              © {{ year }}, made with <i class="fa fa-heart heart"></i> by<a
                href="https://alitabesh.ir"
                class="font-weight-bold ml-1"
                target="_blank"
                rel="noopener"
                >Ali Tabesh</a
              >
              for a better web.
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import BaseNav from "~/components/argon-core/Navbar/BaseNav.vue";

export default {
  components: {
    BaseNav,
  },
  props: {
    backgroundColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      year: new Date().getFullYear(),
      pageClass: "login-page",
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    },
    layoutClass() {
      let exceptions = ["index", "home"];
      if (!exceptions.includes(this.$route.name)) {
        return "bg-default";
      } else {
        return "";
      }
    },
  },
  methods: {
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
  },
  watch: {
    "$route.path"() {
      if (this.showMenu) {
        this.closeMenu();
      }
    },
  },
};
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
