<script>
  import { onMount } from "svelte";
  import Modal from './Modal.svelte';

  export let title = "Daftar Nota";
  let receipts = [];
  let selectedReceipt = null;
  let showModal = false;

  onMount(async () => {
      try {
          const res = await fetch("http://localhost:3000/api/receipts");
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

  const inspectReceipt = async (id) => {
      try {
          const res = await fetch(`http://localhost:3000/api/receipts/${id}`);
          if (res.ok) {
              selectedReceipt = await res.json();
              showModal = true;
              bootstrap.Modal.getOrCreateInstance(document.querySelector('.modal')).show();
          } else {
              console.error("Failed to fetch receipt details:", res.status);
          }
      } catch (error) {
          console.error("Error fetching receipt details:", error);
      }
  };
</script>

<h2>{title}</h2>
<div class="container my-5">
  {#if Array.isArray(receipts) && receipts.length > 0}
      <div class="row g-4">
          {#each receipts as item}
              <div class="col-12">
                  <div class="d-flex align-items-center border p-3">
                      <div>
                          <p class="fw-bold">id: {item.id}</p>
                          <p class="text-start fw-bold">kode: {item.name} {item.category}</p>
                          <button on:click={() => inspectReceipt(item.id)} class="btn btn-dark">Inspect</button>
                      </div>
                  </div>
              </div>
          {/each}
      </div>
  {:else}
      <p>No receipts available.</p>
  {/if}
</div>

<Modal bind:show={showModal} item={selectedReceipt} />
