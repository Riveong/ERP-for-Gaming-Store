<script>
  export let data;

  // Helper function to get the value of a cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  // Helper function to set a cookie
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to add a product to the cart
  function addToCart(productId) {
    // Check if the user is logged in by verifying the presence of the userId cookie
    const userId = getCookie('userId');
    if (!userId) {
      // If not logged in, redirect to the signup page
      window.location.href = '/signin';
      return;
    }

    // If the user is logged in, proceed to add the product to the cart
    let cart = getCookie('cart');
    cart = cart ? JSON.parse(cart) : [];

    if (!cart.includes(productId)) {
      cart.push(productId);
      setCookie('cart', JSON.stringify(cart), 7); // Store for 7 days
      alert('Product added to cart!');
    } else {
      alert('Product is already in the cart.');
    }
  }
</script>

<main class="p-5">
  {#if Array.isArray(data.data) && data.data.length > 0}
    {#each data.data as item}
    <div class="container my-4">
      <div class="d-flex flex-column flex-md-row justify-content-between">
        <div class="column flex-fill me-2">
          <img width="400vw" src={item.thumbnail} alt={item.name} />
        </div>
        <div class="column flex-fill ms-2">
          <h1>{item.name}</h1>
          <p class="fw-bold">{item.category}</p>
          <p class="fw-bolder">Rp. {new Intl.NumberFormat('de-DE').format(item.price)}</p>
          <p class="fw-light">{item.description}</p>
          <!-- Add to cart button with on:click handler -->
          <button class="btn btn-dark" on:click={() => addToCart(item.id)}>Add to cart</button>
        </div>
      </div>
    </div>
    {/each}
  {:else}
    <p>No products available.</p>
  {/if}
</main>

<style>
  .product-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    text-align: center;
    transition: box-shadow 0.3s ease-in-out;
  }

  .product-card img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .product-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
</style>
