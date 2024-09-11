<script>
  import { onMount } from 'svelte';
  let websitePerformance = "";
  let totalReceipts = 0;
  let totalItems = 0;

  // Fetch website performance
  async function fetchWebsitePerformance() {
    const res = await fetch('http://localhost:3000/api/admin/website-performance');
    const data = await res.json();
    websitePerformance = data.loadTime;
  }

  // Fetch total receipts
  async function fetchTotalReceipts() {
    const res = await fetch('http://localhost:3000/api/admin/total-receipts');
    const data = await res.json();
    totalReceipts = data.totalReceipts;
  }

  // Fetch total items
  async function fetchTotalItems() {
    const res = await fetch('http://localhost:3000/api/admin/total-items');
    const data = await res.json();
    totalItems = data.totalItems;
  }

  // Fetch all metrics when the component is mounted
  onMount(async () => {
    await fetchWebsitePerformance();
    await fetchTotalReceipts();
    await fetchTotalItems();
  });
</script>

<style>
  .sidebar {
    min-height: 100vh;
  }
</style>

<!-- Admin Dashboard Layout with Bootstrap -->
<div class="container-fluid">
  <div class="row">
    <!-- Main Content -->
    <main>
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Admin Dashboard</h1>
      </div>

      <!-- Dashboard Cards -->
      <div class="row">
        <!-- Website Performance Card -->
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Website Performance</h5>
              <p class="card-text">Load Time: {websitePerformance}</p>
            </div>
          </div>
        </div>

        <!-- Total Receipts Card -->
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Receipts</h5>
              <p class="card-text">{totalReceipts}</p>
            </div>
          </div>
        </div>

        <!-- Total Items Card -->
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Total Items</h5>
              <p class="card-text">{totalItems}</p>
            </div>
          </div>
        </div>
      </div>

      <center>
      <h3>Known Issues</h3>
      <p>No issue. Horray!</p>
    </center>
    </main>
  </div>
</div>
