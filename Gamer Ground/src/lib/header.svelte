<script>
  import { onMount } from 'svelte';
  import logo from '$lib/images/logo.png';
  import exit from '$lib/images/exit.png';
  import bag from '$lib/images/bag.png';
  import login from '$lib/images/login.png';

  let userId = '';

  // Helper function to get the value of a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Return null if cookie not found
  }

  // This will run only in the browser, not during SSR
  onMount(() => {
    userId = getCookie('userId'); // Fetch the userId from cookies on the client-side
    if (!userId) {
      userId = '';
    }

    // Load Bootstrap JS for collapse functionality
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        console.log('Bootstrap JS loaded');
      })
      .catch((error) => {
        console.error('Error loading Bootstrap JS:', error);
      });
  });

  // Logout function to clear the cookie and reload the page
  const handleLogout = () => {
    document.cookie = 'userId=; Max-Age=0; path=/'; // Clear the userId cookie
    document.cookie = 'cart=; Max-Age=0; path=/'; // Clear the userId cookie
    window.location.href = '/';
  };
</script>

<style>
  .navbar-toggler {
    border: none;
  }
</style>

<!-- Flash sale banner -->
<div class="bg-black text-center text-white p-2 fw-light">
  Flash sale! 50% off everything! until 31st December! 🎉
</div>

<!-- Navbar with collapse functionality -->
<nav class="navbar navbar-expand-lg navbar-light bg-white p-4">
  <div class="container-fluid fw-bold">
    <a class="navbar-brand" href="#"><img style="width:50px" src="{logo}" alt="Logo"></a>

    <!-- Toggle button for mobile collapse -->
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Collapsible part of the navbar -->
    <div class="collapse navbar-collapse fw-light" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <!-- Regular navigation links -->
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/products">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>

        <!-- Show "Logout" if userId exists, otherwise show "Login & Register" -->
        {#if userId}
        <li class="nav-item">
          <span class="nav-link"><b>Welcome, {userId} |</b></span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/cart"> Cart <img src="{bag}" width="20px"/></a>
        </li>
          <li class="nav-item">
            <button on:click={handleLogout} >Logout <img src="{exit}" width="20px"/></button>
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link" href="/signup"> Sign in <img src="{login}" width="15px"/></a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
