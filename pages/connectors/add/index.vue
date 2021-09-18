<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Social Connectors</h6>
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb/>
          </nav> -->
        </div>
        <!-- <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div> -->
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <card header-classes="bg-transparent">
            <h3 slot="header" class="mb-0">Choose one</h3>
            <div class="row icon-examples">
              <div
                class="col-lg-4 col-md-6"
                v-for="cn in this.connectors"
                :key="cn._Id"
              >
                <NuxtLink
                  type="button"
                  class="btn-icon-clipboard"
                  title=""
                  :to="'/connectors/add/'+cn.slug"
                >
                  <div>
                    <img
                      :src="'/img/connectors/' + cn.imagePath"
                      style="max-height: 100px; max-width: 100px"
                      alt=""
                    />
                    <!-- <i class="fab fa-twitter"></i> -->
                    <span>{{ cn.name }} Connector</span>
                  </div>
                  <a>{{cn.description}}</a>
                </NuxtLink>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserEditCard from "~/components/Dashboard/Cards/UserEditCard.vue";
import UserPasswordCard from "~/components/Dashboard/Cards/UserPasswordCard.vue";
// import UserCard from '~/components/pages/UserProfile/UserCard.vue';
export default {
  layout: "DashboardLayout",

  components: {
    UserEditCard,
    UserPasswordCard,
    //UserCard
  },

  data() {
    return {
      user: {
        type: "profile",
        name: null,
        email: null,
        profile_image: null,
      },
      connectors: [],
    };
  },
  created() {
    this.getProfile();
    this.getConnectors();
  },

  methods: {
    async getProfile() {
      await this.$store.dispatch("profile/me");
      this.user = await { ...this.$store.getters["profile/me"] };
    },
    async getConnectors() {
      const s = await this.$store.dispatch("profile/getConnectors");
      this.connectors = s;
    },
  },
};
</script>
