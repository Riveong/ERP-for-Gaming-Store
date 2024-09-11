<script>
	import { onMount } from 'svelte';

	let cartItems = [];
	let products = [];
	let quantities = [];
	let userId = null; // To store the userId from the cookie
  	let userName = null;
	let totalHarga = 0;
	let metode = null;
	let address = "";


	// Function to fetch product details based on an item ID
	async function fetchProductDetails(id) {
		try {
			const response = await fetch(`http://localhost:3000/api/products/${id}`);
			if (!response.ok) {
				throw new Error(`Error fetching product with id ${id}: ${response.statusText}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	// Function to handle quantity changes
	function handleQuantityChange(event, index) {
   quantities[index] = event.target.value;
   calculateTotalHarga(); // Recalculate the total when quantity changes
}


	// Function to generate a unique receipt name (based on the current date)
	function generateReceiptName() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
		const day = String(now.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}-1-${userId}-${metode}`;
	}

	// Function to prepare the receipt data and post it
	async function postReceipt() {
		if (metode === null){
			alert('Please select a payment method');
			return;
		}
		// Generate the items in the format ['item_name; quantity'] and join them into a single string
		const items = products.map((product, index) => `${product.name}; ${quantities[index]}`).join(', ');

		// Prepare the receipt data
		const receiptData = {
			name: generateReceiptName(), // Name based on the current date
			userId: `id:${userId};name:${userName}`, // Retrieved from the cookie
			category: 1, // Hardcoded category
			date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
			item: items, // Concatenated string of items
			price: totalHarga, // Total price
			address: address
			
		};

		console.log('Posting receipt data:', receiptData);

		try {
			const response = await fetch('http://localhost:3000/api/receipts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(receiptData)
			});

			if (response.ok) {
				alert('Receipt successfully posted!');
			} else {
				alert('Failed to post the receipt');
			}
		} catch (error) {
			console.error('Error posting receipt:', error);
			alert('An error occurred while posting the receipt');
		}
	}

	function calculateTotalHarga() {
   totalHarga = products.reduce((sum, product, index) => {
      return sum + product.price * quantities[index]; // Multiply price by quantity
   }, 0);
}

function onChange(event) {
		metode = event.currentTarget.value;
	}

  function removeItem(index) {
	// Get the cart cookie value
	let cart = getCookie('cart');
	
	// Parse the cart cookie if it exists
	if (cart) {
		cart = JSON.parse(cart);
	}

	// Remove the item at the specified index
	cart.splice(index, 1);

	// If the cart is now empty, delete the cart cookie
	if (cart.length === 0) {
		setCookie('cart', '', -1); // Deleting the cookie by setting an expiration in the past
	} else {
		// Otherwise, update the cart cookie with the new cart items
		setCookie('cart', JSON.stringify(cart), 7); // Set updated cart for 7 days
	}
  window.location.reload();
}

  	// Helper function to get the value of a cookie by name
    function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
		return null;
	}

function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


onMount(async () => {
   // Get userId from cookie
   userId = getCookie('Id');
   userName = getCookie('userId');

   // Get cart data from cookie
   const cart = getCookie('cart');
   cartItems = cart ? JSON.parse(cart) : [];
   quantities = cartItems.map(() => 1); // Initialize quantities to 1 by default

   // Fetch product details for each item in cartItems
   const fetchedProducts = await Promise.all(cartItems.map(itemId => fetchProductDetails(itemId)));
   products = fetchedProducts.filter(product => product !== null);
   
   calculateTotalHarga(); // Calculate the total price once products are fetched
});

</script>

<main class="p-5">
	<h1 class="text-center">Your Cart</h1>

	{#if products.length === 0}
		<p class="text-center p-5">Your cart is empty.</p>
	{/if}

	<div class="container">
		{#each products as product, index}
			<div class="row cart-item mb-4">
				<!-- Image on the left -->
				<div class="col-12 col-md-2 text-center">
					<img src={product.thumbnail} alt={product.name} class="img-fluid product-image" />
				</div>

				<!-- Product details in the middle -->
				<div class="col-12 col-md-7">
					<h2 class="h5">{product.name}</h2>
					<p>Category: {product.category}</p>
					<p>Price: {product.price}</p>
					<p>Added Date: {new Date(product.addedDate).toLocaleDateString()}</p>
				</div>

				<!-- Quantity picker on the right -->
				<div class="col-12 col-md-3 text-md-end">
					<label for={`quantity-${index}`} class="form-label">Quantity:</label>
					<input 
						id={`quantity-${index}`} 
						type="number" 
						min="1" 
						value={quantities[index]} 
						class="form-control w-50 d-inline"
						on:input={(e) => handleQuantityChange(e, index)}
					/>
          <button type="button" class="btn btn-dark" on:click={() => removeItem(index)}>❌</button>
				</div>
			</div>
		{/each}


    {#if products.length !== 0}
		<label for={'address'} class="form-label"><b>Alamat Pengiriman</b></label><br>
		<input 
			id={'address'} 
			type="text"
			bind:value={address}
			class="form-control w-50 d-inline"/><br>
	<b>Metode Pembayaran</b><br>
	<label>
		<input checked={metode==="Gopay"} on:change={onChange} type="radio" name="metode" value="Gopay" /> Gopay
	</label>
	<label>
		<input checked={metode==="Shopeepay"} on:change={onChange} type="radio" name="metode" value="Shopeepay" /> Shopeepay
	</label>
	<label>
		<input checked={metode==="Qris"} on:change={onChange} type="radio" name="metode" value="Qris" /> Qris
	</label>

	<p>Total Harga: {totalHarga}</p>
    <div class="text-center">
			<button class="btn btn-primary" on:click={postReceipt}>Bayar</button>
		</div>
	  {/if}

	</div>
</main>

<style>
	.cart-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
		padding: 10px;
		border: 1px solid #ddd;
	}

	.product-image {
		flex: 0 0 100px;
		margin-right: 20px;
	}

	.product-details {
		flex-grow: 1;
		margin-right: 20px;
	}

	.product-quantity {
		flex: 0 0 100px;
		text-align: right;
	}

	.cart-item img {
		width: 100px;
		height: auto;
	}

	h2 {
		margin: 0 0 10px 0;
		font-size: 1.5em;
	}

	p {
		margin: 5px 0;
	}
</style>
