<template>
  <footer class="footer px-4 mx-2">
    <div class="row align-items-center justify-content-lg-between">
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
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
