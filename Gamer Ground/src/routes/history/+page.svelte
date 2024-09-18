<script>
    import { onMount } from "svelte";
    export let title = "History";
    let receipts = [];
    let selectedReceipt = null;
    let userId = null;

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null; // Return null if cookie not found
    }

    onMount(async () => {
        userId = getCookie('Id');
        try {
            const res = await fetch(`http://localhost:3000/api/receipts/history/${userId}`);
            if (res.ok) {
                const data = await res.json();
                receipts = data;
            } else {
                console.error("Failed to fetch receipts:", res.status);
            }
        } catch (error) {
            console.error("Error fetching receipts:", error);
        }
        console.log(receipts);
    });
</script>

{#if userId === null}
    <h1 class="text-center p-5 m-5">Please login first</h1>
    <h1 class="text-center">:(</h1>
{:else}
    <h1 class="text-center">{title}</h1>
    {#each receipts as receipt}
        <div class="card m-5">
            <div class="card-body">
            <h5 class="card-title">{receipt.name}</h5>
            <p class="card-text">Date: {receipt.date}</p>
            <button class="btn btn-dark" on:click={() => selectedReceipt = receipt}>Inspect</button>
            {#if selectedReceipt === receipt}
                <div class="p-2">
                    <p>Receipt Details:</p>
                    <p>Name: {receipt.name}</p>
                    <p>Date: {receipt.date}</p>
                    <p>Price: Rp. {new Intl.NumberFormat('de-DE').format(receipt.price)}</p>
                    <p>Item: {receipt.item}</p>
                </div>
                <button class="btn btn-dark" on:click={() => selectedReceipt = null}>Close</button>
            {/if}
            </div>
        </div>
    {/each}
{/if}