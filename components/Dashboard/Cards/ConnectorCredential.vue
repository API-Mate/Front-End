<template>
  <div class="card">
    <div class="card-header">
      <h1>Credential</h1>
    </div>
    <div class="card-body">
      <form ref="addCC_form" @submit.prevent="handleAddCC">
        <base-input
          v-model="data.account"
          type="text"
          autocomplete="on"
          class="mb-3"
          prepend-icon="fa fa-user-circle"
          placeholder="Account Name or Id"
        />
        <hr />
        <base-input
          v-for="(value, name, index) in connector.credential"
          :key="index"
          v-model="data.credential[name]"
          type="text"
          autocomplete="on"
          class="mb-3"
          prepend-icon="fa fa-key"
          :placeholder="name + ' (' + value + ')'"
        />
        <!-- <base-input
          v-model="password"
          type="password"
          name="new_password"
          autocomplete="on"
          class="mb-3"
          prepend-icon="fa fa-key"
          placeholder="New Password"
        />
        <validation-error :errors="apiValidationErrors.password" />

        <base-input
          v-model="password_confirmation"
          type="password"
          name="confirm_password"
          autocomplete="on"
          class="mb-3"
          prepend-icon="fa fa-key"
          placeholder="Confirm Password"
        /> -->

        <div class="my-4">
          <base-button
            type="button"
            class="btn btn-sm btn-primary"
            native-type="submit"
          >
            Add
          </base-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import BaseInput from "~/components/argon-core/Inputs/BaseInput.vue";
import BaseButton from "~/components/argon-core/BaseButton.vue";
import formMixin from "@/mixins/form-mixin";
import ValidationError from "~/components/ValidationError.vue";

export default {
  name: "UserPasswordCard",

  components: {
    BaseInput,
    BaseButton,
    ValidationError,
  },

  mixins: [formMixin],

  props: {
    connector: Object,
  },

  data() {
    return {
      data: {
        account: "",
        connector_id: null,
        credential: {
          consumer_key: "",
          consumer_secret: "",
          access_token_key: "",
          access_token_secret: "",
        },
      },
    };
  },

  methods: {
    async handleAddCC() {
      // console.log(this.connector);
      this.data.connector_id = this.connector._id;
      //console.log(this.data);
      var newUser = JSON.parse(JSON.stringify(this.$auth.user));
      // console.log("newUser");
      // console.log(newUser);

      if (!newUser.accounts || !newUser.accounts.length) {
        newUser.accounts = [];
      }
      newUser.accounts.push(this.data);
      //console.log(newUser);
      // if (["1"].includes(this.user.id)) {
      //   await this.$notify({
      //     type: "danger",
      //     message: "You are not allowed not change data of default users.",
      //   });
      //   return;
      // }

      // this.user.password = this.password;
      // this.user.password_confirmation = this.password_confirmation;
      try {
        await this.$store.dispatch("users/update", newUser);
        this.$refs["addCC_form"].reset();
        //this.unsetApiValidationErrors();
        this.$auth.setUser(newUser);
        this.$notify({
          type: "success",
          message: "Account added successfully.",
        });
      } catch (error) {
        this.$notify({
          type: "danger",
          message: "Oops, something went wrong!" + error.toString(),
        });
        //this.setApiValidation(error.response.data.errors);
      }
    },
  },
};
</script>