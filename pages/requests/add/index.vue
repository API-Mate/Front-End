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
              <p>
                <el-cascader
                  :options="casoptions"
                  :props="{ multiple: true }"
                  style="width: 100%"
                  v-model="selectedAccounts"
                  placeholder="Select Accounts/Connectors"
                  clearable
                  filterable
                  ><template slot-scope="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span v-if="!node.isLeaf">
                      ({{ data.children.length }})
                    </span>
                  </template></el-cascader
                >
              </p>

              <div>
                <span><i class="fa fa-list"></i> Content</span>
              </div>
              <div class="wrapper mb-3">
                <textarea
                  class="form-control mt-1 regular-input"
                  v-model="content"
                  rows="2"
                  dir="auto"
                  placeholder="Enter the message to send"
                ></textarea>

                <emoji-picker @emoji="append" :search="search">
                  <div
                    class="emoji-invoker"
                    slot="emoji-invoker"
                    slot-scope="{ events: { click: clickEvent } }"
                    @click.stop="clickEvent"
                  >
                    <svg
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path
                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                      />
                    </svg>
                  </div>
                  <div
                    slot="emoji-picker"
                    slot-scope="{ emojis, insert, display }"
                  >
                    <div
                      class="emoji-picker"
                      :style="{ top: display.y + 'px', left: display.x + 'px' }"
                    >
                      <div class="emoji-picker__search">
                        <input type="text" v-model="search" v-focus />
                      </div>
                      <div>
                        <div
                          v-for="(emojiGroup, category) in emojis"
                          :key="category"
                        >
                          <h5>{{ category }}</h5>
                          <div class="emojis">
                            <span
                              v-for="(emoji, emojiName) in emojiGroup"
                              :key="emojiName"
                              @click="insert(emoji)"
                              :title="emojiName"
                              >{{ emoji }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </emoji-picker>
                <div class="text-right" v-if="charCount != 0">
                <small 
                  >{{ charCount }} characters</small></div>
              </div>
              
              <base-input
                name="confirm_password"
                autocomplete="on"
                prepend-icon="fa fa-key"
                placeholder="Http Proxy"
              />
              <div class="mb-3">
                <el-switch
                  v-model="schedule"
                  inactive-color="#13ce66"
                  active-text="Schedule for sending"
                  inactive-text="Send Now!"
                >
                </el-switch>
                <div v-if="schedule">
                  <el-date-picker
                    class="mt-3"
                    v-model="scheduleTime"
                    type="datetime"
                    placeholder="Select date and time"
                    default-time="12:00:00"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="my-4">
                <base-button
                  type="button"
                  class="btn btn-sm btn-primary"
                  native-type="submit"
                  @click="sendRequest"
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
import EmojiPicker from "vue-emoji-picker";
import { Cascader, DatePicker, Switch } from "element-ui";
// import UserCard from '~/components/pages/UserProfile/UserCard.vue';
export default {
  layout: "DashboardLayout",

  components: {
    EmojiPicker,
    UserEditCard,
    UserPasswordCard,
    IconCheckbox,
    [Cascader.name]: Cascader,
    [DatePicker.name]: DatePicker,
    [Switch.name]: Switch,
    //UserCard
  },

  // mounted() {
  //   if (this.$query.from !== "") {
  //     slcs = JSON.parse(this.$query.from);
  //     slcs.forEach((element) => {
  //       selectedAccounts.push(
  //         this.$auth.user.accounts.find((acc) => acc.account === element)
  //       );
  //     });
  //     console.log(selectedAccounts);
  //     console.log(this.$auth.user.accounts);
  //   }
  // },
  async asyncData({ $auth, query, store }) {
    let casoptions = [];
    const connectors = await store.dispatch("profile/getConnectors");
    console.log(connectors);
    const allAccounts = $auth.user.accounts;
    allAccounts.forEach((element) => {
      let con = casoptions.find((o) => o.value === element.connector_id);
      if (!con) {
        casoptions.push({
          value: element.connector_id,
          label: connectors.find((o) => o._id === element.connector_id).name,
          lazy: true,
          children: [],
        });
        con = casoptions.find((o) => o.value === element.connector_id);
      }
      con.children.push({
        value: allAccounts.findIndex((p) => p == element),
        label: element.account,
      });
    });
    console.log(casoptions);
    console.log("casoptions");

    let selectedAccounts = [];
    let slcs = [];
    if (query.from != null) {
      slcs = JSON.parse(query.from);
      slcs.forEach((element) => {
        let acc = $auth.user.accounts[element];
        selectedAccounts.push([acc.connector_id, element]);
      });
      console.log(selectedAccounts);
    }
    return {
      selectedAccounts,
      connectors,
      casoptions,
    };
  },
  data() {
    return {
      content: "",
      search: "",
      scheduleTime: "",
      schedule: false,
      user: {
        type: "profile",
        name: null,
        email: null,
        profile_image: null,
      },
    };
  },
  computed: {
    charCount: function () {
      // Return number of lines using regex if not empty
      return this.content.length;
    },
  },
  created() {
    this.getProfile();
    this.$router.replace({ query: null });
  },

  methods: {
    sendRequest() {
      console.log(this.selectedAccounts);
    },
    append(emoji) {
      this.content += emoji;
    },
    async getProfile() {
      await this.$store.dispatch("profile/me");
      this.user = await { ...this.$store.getters["profile/me"] };
    },
  },
};
</script>
<style>
.el-picker-panel__footer {
  font-size: 1rem !important;
}
/* Tailwind CSS-styled demo is available here: https://codepen.io/DCzajkowski/pen/Brxvzj */

.wrapper {
  position: relative;
}

.regular-input {
  border-radius: 3px;
  border: 1px solid #ccc;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.emoji-invoker {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  z-index: 1;
  border: 1px solid #ccc;
  width: 100%;
  max-height: 15rem;
  overflow: scroll;
  padding: 1rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>