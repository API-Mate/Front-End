<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb></route-breadcrumb>
          </nav> -->
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button @click="$router.push('/Requests/Add')" size="sm" type="neutral">New Request</base-button>
          <base-button @click="$router.push('/Requests')" size="sm" type="neutral">List of Requests</base-button>
        </div>
      </div>

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Total requests"
            type="gradient-info"
            :sub-title="requests.reduce((n, {all}) => n + all, 0)"
            icon="ni ni-chart-pie-35"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Successful requests"
            type="gradient-green"
            :sub-title="requests.reduce((n, {success}) => n + success, 0)"
            icon="ni ni-chart-pie-35"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Failed requests"
            type="gradient-red"
            :sub-title="requests.reduce((n, {fail}) => n + fail, 0)"
            icon="ni ni-chart-pie-35"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Scheduled requests"
            type="gradient-orange"
            :sub-title="requests.reduce((n, {scheduled}) => n + scheduled, 0)"
            icon="ni ni-chart-bar-32"
          >
          </stats-card>
        </div>
      </div>
    </base-header>

  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/argon-core/Charts/config";
import LineChart from "@/components/argon-core/Charts/LineChart";
import BarChart from "@/components/argon-core/Charts/BarChart";

import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/argon-core/Cards/StatsCard";
import SocialTrafficTable from "@/components/pages/dashboard/SocialTrafficTable.vue";
import PageVisitsTable from "@/components/pages/dashboard/PageVisitsTable.vue";

export default {
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.$auth.loggedIn) {
      console.log("Not logged in");
      return redirect("/login");
    }
    // if (false) {
    //   return redirect("/login");
    // }
  },
  layout: "DashboardLayout",
  components: {
    LineChart,
    BarChart,
    RouteBreadCrumb,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable,
  },
  data() {
    return {
      requests: [],
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40],
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: "Performance",
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
            },
          ],
          labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29],
            },
          ],
        },
      },
    };
  },
  created() {
    this.getMyRequest();
  },
  methods: {    
    async getMyRequest() {
      this.requests = await this.$store.dispatch("profile/getMyRequest");
      console.log(this.requests);
    },
    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index],
          },
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    },
  },
  mounted() {
    this.initBigChart(0);
  },
};
</script>
<style>
</style>
