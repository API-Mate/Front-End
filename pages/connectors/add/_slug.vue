<template>
  <div class="container-fluid mt-5">
    <!-- <div class="row">
            <div class="col-xl-6 order-xl-1" >
                <div>
                    <user-edit-card :user="user"/>
                </div>
                <div class="mt-5">
                    <user-password-card :user="user"/>
                </div>
            </div>
            <div class="col-xl-6 order-xl-2">
                <user-card />
            </div>
        </div> -->
    <div class="row" v-if="connector != null">
      <div class="col-xl-5 order-xl-1">
        <div>
          <img
            :src="'/img/connectors/' + connector.imagePath"
            style="max-height: 100px; max-width: 100px"
            alt=""
          />
          <!-- <i class="fab fa-twitter"></i> -->
          <span>{{ connector.name }} Connector</span>
        </div>
        <p class="mt-4">{{ connector.description }}</p>
        <p>
          Proxy Needed:
          <span
            :class="connector.proxyNeeded ? 'text-danger' : 'text-success'"
            >{{ connector.proxyNeeded ? "Yes (unfortunately)" : "No" }}</span
          >
        </p>
        <p>
          Help Link:
          <a :href="connector.helpLink" target="_black">{{
            connector.helpLink
          }}</a>
        </p>
        <b>Credential:</b>
        <ul>
          <li v-for="(value, name) in connector.credential" :key="name">
            {{ name }}: {{ value }}
          </li>
        </ul>
      </div>
      <div class="col-xl-7 order-xl-2">
        <connector-credential :connector="connector" />
      </div>
    </div>
  </div>
</template>
<script>
import UserEditCard from "~/components/Dashboard/Cards/UserEditCard.vue";
import ConnectorCredential from "~/components/Dashboard/Cards/ConnectorCredential.vue";
// import UserCard from '~/components/pages/UserProfile/UserCard.vue';
export default {
  layout: "DashboardLayout",

  components: {
    UserEditCard,
    ConnectorCredential,
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
      connector: null,
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
      this.connector = s.find(
        (c) => c.slug === this.$route.params.slug
      );
    },
  },
};
</script>
