<script>
    export let show = false;
    export let item = null;

    const closeModal = () => {
        show = false;
    };
</script>

<div class="modal fade {show ? 'show' : ''}" tabindex="-1" style="display: {show ? 'block' : 'none'};" aria-hidden="{!show}">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Receipt Details</h5>
                <button type="button" class="btn-close" on:click="{closeModal}" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {#if item}
                    <p><strong>ID:</strong> {item.id}</p>
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Category:</strong> {item.category}</p>
                    <p><strong>Added Date:</strong> {item.date}</p>
                    <p><strong>Items:</strong> {item.item}</p>
                    <p><strong>Address:</strong> {item.address}</p>
                    <p><strong>Price:</strong> Rp. {item.price}</p>

                {:else}
                    <p>Loading...</p>
                {/if}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" on:click="{closeModal}">Close</button>
            </div>
        </div>
    </div>
</div>

<style>
    /* This CSS will not use JS expressions */
    .modal-backdrop.show {
        display: block;
    }
</style>
