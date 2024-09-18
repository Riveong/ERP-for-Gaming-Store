<script>
  import { onMount } from "svelte";
  export let title = "Edit Barang";
  let products = [];
  let showModal = false;
  let selectedProduct = null;
  let thumbnail = null; // Stores the uploaded image (base64 string)

  // Fetch products on component mount
  onMount(async () => {
    await fetchProducts();
  });

  // Function to fetch products from the API
  async function fetchProducts() {
    try {
      const res = await fetch("http://localhost:3000/api/products");
      if (res.ok) {
        const data = await res.json();
        products = data;
      } else {
        console.error("Failed to fetch products:", res.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Function to delete a product by id
  async function deleteProduct(id) {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        products = products.filter(product => product.id !== id);
        console.log(`Product with id ${id} deleted successfully.`);
      } else {
        console.error("Failed to delete product:", res.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  // Function to show the edit modal for a specific product
  function openEditModal(product) {
    selectedProduct = { ...product }; // Clone the product to prevent live editing
    thumbnail = selectedProduct.thumbnail; // Initialize the thumbnail to the existing one
    showModal = true;
    console.log("Editing product:", selectedProduct);
  }

  // Function to hide the modal
  function closeEditModal() {
    showModal = false;
  }

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        thumbnail = e.target.result; // Set the Base64 image string
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to update the product
  async function updateProduct() {
  const updatedProduct = {
    ...selectedProduct,
    thumbnail: thumbnail !== selectedProduct.thumbnail ? thumbnail : selectedProduct.thumbnail,
  };

  try {
    const res = await fetch(`http://localhost:3000/api/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct), // Make sure description is included here
    });

    if (res.ok) {
      products = products.map(product =>
        product.id === selectedProduct.id ? updatedProduct : product
      );
      closeEditModal();
    } else {
      console.error(`Failed to update product: ${selectedProduct.id}`, res.status);
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

</script>

<h2>{title}</h2>
<div class="container my-5">
  {#if Array.isArray(products) && products.length > 0}
    <div class="row g-4">
      {#each products as item}
        <div class="col-12">
          <div class="d-flex align-items-center border p-3">
            <img 
              src={item.thumbnail} 
              alt={item.name} 
              class="img-thumbnail me-3" 
              style="width: 150px; height: 150px; object-fit: cover;" 
            />
            <div>
              <b class="">id: {item.id}</b>
              <h3 class="text-start fw-light">{item.name}</h3>
              <p class="text-start fw-bold">{item.category}</p>
              <p class="text-start fw-light">Rp. {new Intl.NumberFormat('de-DE').format(item.price)}</p>
              <button class="btn btn-dark" on:click={() => openEditModal(item)}>edit</button>
              <button class="btn btn-danger" on:click={() => deleteProduct(item.id)}>delete</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <p>No products available.</p>
  {/if}
</div>

<!-- Modal for Editing a Product -->
{#if showModal}
  <div class="modal show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Product</h5>
          <button type="button" class="btn-close" aria-label="Close" on:click={closeEditModal}></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="productName" class="form-label">Product Name</label>
            <input
              type="text"
              id="productName"
              class="form-control"
              bind:value={selectedProduct.name}
            />
          </div>

          <div class="mb-3">
            <label for="productCategory" class="form-label">Category</label>
            <input
              type="text"
              id="productCategory"
              class="form-control"
              bind:value={selectedProduct.category}
            />
          </div>

          <div class="mb-3">
            <label for="productPrice" class="form-label">Price</label>
            <input
              type="number"
              id="productPrice"
              class="form-control"
              bind:value={selectedProduct.price}
            />
          </div>

          <div class="mb-3">
            <label for="productDescription" class="form-label">Description</label>
            <!-- Textarea now initialized with the former description -->
            <textarea
              id="productDescription"
              class="form-control"
              rows="4"
              bind:value={selectedProduct.description}
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="productImage" class="form-label">Product Image</label>
            <input type="file" id="productImage" class="form-control" on:change={handleImageUpload} />
            {#if thumbnail}
              <img src={thumbnail} alt="New Image" class="img-thumbnail mt-3" style="width: 150px; height: 150px; object-fit: cover;" />
            {/if}
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" on:click={closeEditModal}>Close</button>
          <button type="button" class="btn btn-primary" on:click={updateProduct}>Save changes</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal.show {
    display: block;
  }
</style>
