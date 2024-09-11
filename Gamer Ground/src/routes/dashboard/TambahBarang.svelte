<script>
    export let title = "Tambah Barang";

    let name = "";
    let category = "";
    let addedDate = "";
    let thumbnail = "";
    let price = "";
    let description = "";
    let categories = ['PC RAKITAN', 'LAPTOP', 'MOUSE', 'KEYBOARD', 'MONITOR', 'SPAREPARTS'];

    const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            thumbnail = e.target.result;  // This should be a valid Base64 string
            console.log('Base64 image:', thumbnail);  // Log the Base64 string for verification
        };
        reader.readAsDataURL(file);
    }
};

    const submitForm = async () => {
        console.log({ name, category, addedDate, thumbnail, price, description }); // Check the values here

    const newItem = {
        name,
        category,
        addedDate,
        thumbnail,
        price: parseFloat(price),
        description
    };

    try {
        const response = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        });

        const result = await response.json();
        console.log("Server response:", result); // Log the full response

        if (response.ok) {
            alert("Item added successfully!");
            name = "";
            category = "";
            addedDate = "";
            thumbnail = "";
            price = "";
            description = "";

            document.getElementById('thumbnail').value = "";
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error("Error adding item:", error);
        alert("An error occurred while adding the item.");
    }
};

</script>

<h2>{title}</h2>

<form on:submit|preventDefault={submitForm}>
    <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" id="name" class="form-control" bind:value={name} required />
    </div>

    <div class="mb-3">
        <label for="category" class="form-label">Category</label>
        <select id="category" class="form-control" bind:value={category} required>
            <option value="" disabled selected>Select a category</option>
            {#each categories as cat}
              <option value={cat}>{cat}</option> <!-- Loop through categories to create options -->
            {/each}
          </select>
    </div>

    <div class="mb-3">
        <label for="addedDate" class="form-label">Added Date</label>
        <input type="datetime-local" id="addedDate" class="form-control" bind:value={addedDate} required />
    </div>

    <div class="mb-3">
        <label for="thumbnail" class="form-label">Thumbnail (Image Upload)</label>
        <input type="file" id="thumbnail" class="form-control" accept="image/*" on:change={handleImageUpload} required />
    </div>

    <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input type="number" id="price" class="form-control" bind:value={price} required />
    </div>

    <div class="mb-3">
        <label for="price" class="form-label">description</label>
        <input type="text" id="description" class="form-control" bind:value={description} required />
    </div>

    <button type="submit" class="btn btn-primary">Add Item</button>
</form>
