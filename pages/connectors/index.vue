<template>
  <div class="container-fluid mt-5">
    <!-- <div class="alert alert-danger">
      <strong
        >Add, Edit, Delete features are not functional. This is a PRO feature!
        Click
        <a
          href="https://github.com/API-Mate"
          target="_blank"
          id="pro-feature"
          >here</a
        >
        to see the PRO product.</strong
      >
    </div> -->
    <div>
      <card
        class="no-border-card"
        body-classes="px-0 pb-1"
        footer-classes="pb-2"
      >
        <template slot="header">
          <div class="row">
            <div class="col-6">
              <h3 class="mb-0">List of Account</h3>
            </div>
            <div class="col-6 text-right">
              <base-button type="primary" icon size="sm" @click="addAccount">
                <span class="btn-inner--icon"
                  ><i class="fas fa-user-edit"></i
                ></span>
                <span class="btn-inner--text">Add Account</span>
              </base-button>
            </div>
          </div>
        </template>
        <div>
          <div
            class="
              col-12
              d-flex
              justify-content-center justify-content-sm-between
              flex-wrap
              mb-4
            "
          >
            <el-select
              class="select-primary pagination-select"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-primary"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <base-button type="primary" icon size="sm" @click="addAccount">
              <span class="btn-inner--icon"
                ><i class="fas fa-calendar-plus"></i
              ></span>
              <span class="btn-inner--text">New Request to Selected Accounts</span>
            </base-button>
          </div>
          <el-table
            class="table-responsive align-items-center table-flush"
            header-row-class-name="thead-light"
            :data="accounts"
            @sort-change="sortChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              label="account"
              min-width="110px"
              prop="account"
              sortable="custom"
            />

            <el-table-column
              prop="connector_id"
              label="connector"
              min-width="310px"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <div v-if="getConnectorById(scope.row.connector_id)">
                  <div>
                    <img
                      :src="
                        '/img/connectors/' +
                        getConnectorById(scope.row.connector_id).imagePath
                      "
                      style="max-height: 30px; max-width: 30px"
                      alt=""
                    />
                    <!-- <i class="fab fa-twitter"></i> -->
                    <span
                      >{{
                        getConnectorById(scope.row.connector_id).name
                      }}
                      Connector</span
                    >
                  </div>
                  <p>
                    {{ getConnectorById(scope.row.connector_id).description }}
                  </p>
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="credential"
              label="credential"
              min-width="310px"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <p>{{ scope.row.credential }}</p>
              </template>
            </el-table-column>
            <el-table-column min-width="180px" align="center">
              <div class="table-actions">
                <base-button type="primary" icon size="sm" @click="addAccount">
                  <span class="btn-inner--text">New Request</span>

                  <span
                    ><i class="fa fa-paper-plane"></i
                  ></span>
                </base-button>
                <el-tooltip content="Edit" placement="top">
                  <a
                    type="text"
                    @click="addAccount"
                    class="table-action"
                    data-toggle="tooltip"
                    style="cursor: pointer"
                  >
                    <i class="fas fa-user-edit"></i>
                  </a>
                </el-tooltip>

                <el-tooltip content="Delete" placement="top">
                  <a
                    type="text"
                    @click="addAccount"
                    class="table-action table-action-delete"
                    data-toggle="tooltip"
                    style="cursor: pointer"
                  >
                    <i class="fas fa-trash"></i>
                  </a>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
        </div>
        <div
          slot="footer"
          class="
            col-12
            d-flex
            justify-content-center justify-content-sm-between
            flex-wrap
          "
        >
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries

              <span v-if="selectedRows.length">
                &nbsp; &nbsp; {{ selectedRows.length }} rows selected
              </span>
            </p>
          </div>
          <base-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          />
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BasePagination } from "@/components/argon-core";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Tooltip,
  Select,
  Option,
  Button,
} from "element-ui";

export default {
  layout: "DashboardLayout",

  components: {
    BasePagination,
    [Tooltip.name]: Tooltip,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
  },

  data() {
    return {
      selectedRows: [],
      accounts: [],
      connectors: [],
      sort: "created_at",

      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
      },

      total: 1,
    };
  },
  computed: {
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },

    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
  },

  created() {
    this.getConnectors();
    this.getList();
  },

  methods: {
    async getConnectors() {
      this.connectors = await this.$store.dispatch("profile/getConnectors");
    },
    getConnectorById(id) {
      if (this.connectors.length > 0)
        return this.connectors.find((x) => x._id === id);
    },
    getList() {
      this.accounts = this.$auth.user.accounts;
    },
    addAccount() {
      this.$router.push("/Connectors/Add");
      // this.$notify({
      //   type: "danger",
      //   message: "This is a PRO feature.",
      // });
    },
    sortChange({ prop, order }) {
      if (order === "descending") {
        this.sort = `-${prop}`;
      } else {
        this.sort = `${prop}`;
      }
      this.getList();
    },
  },
};
</script>
<style>
#pro-feature {
  color: #5e72e4;
  font-weight: bold;
}
#pro-feature:hover {
  color: #233dd2;
}
</style>
