<script>
  import { onMount } from 'svelte';
  import logo from '$lib/images/logo.png';
  import exit from '$lib/images/exit.png';
  import bag from '$lib/images/bag.png';
  import login from '$lib/images/login.png';
  import history from '$lib/images/history.png';
  import user from '$lib/images/user.png';

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
    userId = getCookie('userId');
    if (!userId) {
      userId = '';
    }
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        console.log('Bootstrap JS loaded for collapse');
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
    <a class="navbar-brand" href="/"><img style="width:50px" src="{logo}" alt="Logo"> Gamer Ground </a>

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

    <div class="collapse navbar-collapse fw-light" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/products">Products</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>

        {#if userId}
        <li class="nav-item">
          <span class="nav-link"><b>Welcome, {userId} |</b></span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/cart"> <img src="{bag}" width="20px"/> Cart </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/history"> <img src="{history}" width="20px"/> History </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profile">  <img src="{user}" width="20px"/> Profile</a>
        </li>
          <li class="nav-item">
            <button class="nav-link text-danger" on:click={handleLogout} style="border: none; background: none; padding: 0; margin: 0; margin-top: 6px"><img src="{exit}" width="20px"/> Logout </button>
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
