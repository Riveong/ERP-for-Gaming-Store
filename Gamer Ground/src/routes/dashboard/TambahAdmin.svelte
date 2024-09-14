<script>
    import { onMount } from 'svelte';

    let admins = []; // Start with an empty array
    let showModal = false;
    let name = '';
    let email = '';
    let password = ''; // Add password field for the new admin

    // Fetch admin list from the API when the component mounts
    onMount(async () => {
        await fetchAdmins();
    });

    // Function to fetch the list of admins
    async function fetchAdmins() {
        try {
            const response = await fetch('http://localhost:3000/api/admins');
            if (response.ok) {
                admins = await response.json(); // Populate the admins array with data from API
            } else {
                console.error('Failed to fetch admin list');
            }
        } catch (error) {
            console.error('Error fetching admin list:', error);
        }
    }

    // Open modal for adding an admin
    function openModal() {
        showModal = true;
    }

    // Close modal
    function closeModal() {
        showModal = false;
        name = ''; // Reset form fields
        email = '';
        password = '';
    }

    // Register admin via API
    async function registerAdmin() {
        if (!name || !email || !password) {
            alert('All fields are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password }) // Send admin data
            });

            const result = await response.json();

            if (response.ok) {
                alert('Admin added successfully!');
                admins = [...admins, { id: result.id, name, email }]; // Update UI with new admin
                closeModal(); // Close the modal
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error registering admin:', error);
            alert('Server error, please try again later.');
        }
    }

    // Delete admin via API
    async function deleteAdmin(id) {
        if (!confirm('Are you sure you want to delete this admin?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/admins/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Admin deleted successfully!');
                admins = admins.filter(admin => admin.id !== id); // Update the UI after successful deletion
            } else {
                const result = await response.json();
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
            alert('Server error, please try again later.');
        }
    }
</script>

<h1>Admin</h1>

<button on:click={openModal}>Add Admin</button>

{#if showModal}
    <div class="modal" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center;">
        <div class="modal-content" style="background: white; padding: 2rem; border-radius: 10px;">
            <span class="close" on:click={closeModal} style="cursor: pointer;">&times;</span>
            <h2>Register Admin</h2>
            <form on:submit|preventDefault={registerAdmin}>
                <label for="name">Name:</label>
                <input type="text" id="name" bind:value={name} required>
                <label for="email">Email:</label>
                <input type="email" id="email" bind:value={email} required>
                <label for="password">Password:</label>
                <input type="password" id="password" bind:value={password} required>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
{/if}

<div class="card p-4 m-5 bg-danger text-white">
    <h3>Root Admin</h3>
    <p>env@admin.com</p>
</div>

{#each admins as admin (admin.id)}
    <div class="card p-4 m-5" key={admin.id}>
        <h3>{admin.name}</h3>
        <p>Email: {admin.email}</p>
        <button class="btn btn-danger" on:click={() => deleteAdmin(admin.id)}>Delete</button>
    </div>
{/each}
