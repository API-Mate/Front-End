<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'fa fa-tachometer-alt text-primary',
            path: '/dashboard',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'New Request',
            path: '/requests/add',
            icon: 'fa fa-calendar-plus',
          }"
        />
        <sidebar-item
          :link="{
            name: 'All Requests',
            icon: 'ni ni-align-left-2 text-default',
            path: '/requests',
          }"
        >
        </sidebar-item>

        <sidebar-item
          opened
          :link="{
            name: 'My Accounts',
            icon: 'fa fa-plug',
          }"
        >
          <sidebar-item
            opened
            :link="{ name: 'Add New Account', path: '/connectors/add' }"
          />
          <sidebar-item
            opened
            :link="{
              name: 'List of Account',
              path: '/connectors',
            }"
          />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Profile Setting',
            icon: 'fa fa-user-cog text-default',
            path: '/profile-setting',
          }"
        >
        </sidebar-item>
        <!-- <sidebar-item
          :link="{
            name: 'Logout',
            icon: 'fa fa-sign-out-alt',
            path: '/logout',
          }"
        >
        </sidebar-item> -->
        <li class="nav-item">
          <!---->
          <div class="collapse show" style="display: none">
            <ul class="nav nav-sm flex-column"></ul>
          </div>
          <a @click.prevent="logout()" style="cursor:pointer" class="nav-link"
            ><i class="fa fa-sign-out-alt"></i>
            <span class="nav-link-text">Logout</span></a
          >
        </li>

        <hr
          class="my-3"
          style="
            border: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            min-width: 80%;
            overflow: visible;
            box-sizing: content-box;
            height: 0;
          "
        />

        <a
          href="#"
          target="_blank"
          class="btn btn-danger btn-icon ml-sm-3 d-md-block mb-2 mt-1 mr-3"
          ><span class="btn-inner--icon"
            ><i class="fas fa-download mr-2"></i
          ></span>
          <span class="nav-link-inner--text">Upgrade to Premium Plan!</span></a
        >
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar
        :type="$route.name === 'alternative' ? 'light' : 'default'"
      ></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "~/components/layouts/argon/DashboardNavbar.vue";
import ContentFooter from "~/components/layouts/argon/ContentFooter.vue";
import DashboardContent from "~/components/layouts/argon/Content.vue";
import Vuex from "vuex";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("scrollbar-inner");
      }
    },
    async logout() {
      try {
        await this.$auth.logout();
      } catch (error) {
        this.$toast.error(error.response.message);
      }
    },
  },
  mounted() {
    this.initScrollbar(), this.$store.dispatch("profile/me");
  },
};
</script>
<style lang="scss">
</style>
