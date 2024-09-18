<script>
    export let data;
    let searchQuery = '';

  function handleEnter(event) {
    if (event.key === 'Enter' && searchQuery) {
      // Redirect to the new URL
      window.location.href = `http://localhost:5173/products/filter/${encodeURIComponent(searchQuery)}`;
    }
  }

</script>
  
  <main>
    
    <h1 class="fw-light text-center">Katalog</h1>
    <center><input type="text" class="form-control mb-5" style="width:70%" placeholder="Cari produk..." bind:value={searchQuery} on:keypress={handleEnter}></center>
    <div class="text-center">
        <a href="../products" class="btn bg-black text-white p-2" style="border:none">ALL PRODUCTS</a>
        <a href="../products/pc rakitan" class="btn bg-black text-white p-2" style="border:none">PC RAKITAN</a>
        <a href="../products/laptop" class="btn bg-black text-white p-2" style="border:none">LAPTOP</a>
        <a href="../products/mouse" class="btn bg-black text-white p-2" style="border:none">MOUSE</a>
        <a href="../products/keyboard" class="btn bg-black text-white p-2" style="border:none">KEYBOARD</a>
        <a href="../products/monitor" class="btn bg-black text-white p-2" style="border:none">MONITOR</a>
        <a href="../products/spareparts" class="btn bg-black text-white p-2" style="border:none">SPAREPARTS</a>
    </div>
    <div class="container my-5">
    {#if Array.isArray(data.data) && data.data.length > 0}
    <div class="row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">

        {#each data.data as item}
        <div class="col">
            <div class="product-card">
            <img src={item.thumbnail} alt={item.name} />
            <h2 class="text-start fw-light">{item.name}</h2>
            <p class="text-start fw-bold">{item.category}</p>
            <p class="text-start fw-light">Rp. {new Intl.NumberFormat('de-DE').format(item.price)}</p>
            <a href="../detail/{item.id}" class="btn btn-dark">Detail</a>
          </div>
        </div>
        {/each}
    </div>
    {:else}
      <p>No products available.</p>
      
    {/if}
        
    </div>
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