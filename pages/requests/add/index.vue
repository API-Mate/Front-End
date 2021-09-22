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
    <div class="row">
      <div class="col-xl-6 order-xl-1">
        <!-- <user-edit-card :user="user" /> -->
        Some Description
      </div>
      <div class="col-xl-6 order-xl-2">
        <div class="card">
          <div class="card-header">
            <h1>Send New Request</h1>
          </div>
          <div class="card-body">
            <form ref="password_form" @submit.prevent="">
              <p>connectors</p>

              <div>
                <span><i class="fa fa-list"></i> Content</span>
              </div>
              <textarea
                class="form-control mb-3"
                rows="5"
                v-model="connectors"
              ></textarea>

              <base-input
                name="confirm_password"
                autocomplete="on"
                prepend-icon="fa fa-key"
                placeholder="Http Proxy"
              />

              <p>schedule</p>
              <icon-checkbox v-bind="check" />
              <div class="my-4">
                <base-button
                  type="button"
                  class="btn btn-sm btn-primary"
                  native-type="submit"
                >
                  Send
                </base-button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserEditCard from "~/components/Dashboard/Cards/UserEditCard.vue";
import UserPasswordCard from "~/components/Dashboard/Cards/UserPasswordCard.vue";
import IconCheckbox from "~/components/argon-core/Inputs/IconCheckbox.vue";
// import UserCard from '~/components/pages/UserProfile/UserCard.vue';
export default {
  layout: "DashboardLayout",

  components: {
    UserEditCard,
    UserPasswordCard,
    IconCheckbox,
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
      check: {
        checked: true,
        name: "String",
        title: "String",
        icon: "String",
        disabled: false,
      },
    };
  },
  created() {
    this.getProfile();
  },

  methods: {
    async getProfile() {
      await this.$store.dispatch("profile/me");
      this.user = await { ...this.$store.getters["profile/me"] };
    },
  },
};
</script>
