<script>
    import { onMount } from "svelte";
    export let title = "Daftar Barang";
    let products = [];

    onMount(async () => {
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
        console.log(products);
    });
    
</script>

<h2>{title}</h2>
<div class="container my-5">
    {#if Array.isArray(products) && products.length > 0}
        <div class="row g-4">
            {#each products as item}
                <div class="col-12">
                    <div class="d-flex align-items-center border p-3">
                        <img src={item.thumbnail} alt={item.name} class="img-thumbnail me-3" style="width: 150px; height: 150px; object-fit: cover;" />
                        <div>
                            <b class="">id: {item.id}</b>
                            <h3 class="text-start fw-light">{item.name}</h3>
                            <p class="text-start fw-bold">{item.category}</p>
                            <p class="text-start fw-light">Rp. {new Intl.NumberFormat('de-DE').format(item.price)}</p>
                            <a href="../detail/{item.id}" class="btn btn-dark">Detail</a>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p>No products available.</p>
    {/if}
</div>
