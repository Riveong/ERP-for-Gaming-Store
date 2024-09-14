<script>
    import { onMount } from "svelte";
  
    let userId;
    let user = null;
    let pic = "https://avatar.iran.liara.run/public/girl?username=";
    let showEmailModal = false;
    let showPasswordModal = false;
    let showDeleteModal = false;
    let selectedUser = null; // For user updates
    let newEmail = ''; // For updating email
    let password = ''; // For current password (required for both updates)
    let newPassword = '';
    let confirmNewPassword = '';
    
  
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    }
  
    onMount(async () => {
      userId = getCookie('Id');
      if (!userId) {
        window.location.href = '/login';
      }
      await getData(userId);
    });
  
    async function getData(userId) {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`);
      const data = await res.json();
      user = data;
    }
  

  // Open the delete modal
  function openDeleteModal() {
    showDeleteModal = true;
  }

  // Close the delete modal
  function closeDeleteModal() {
    showDeleteModal = false;
  }

  async function deleteUser() {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'password': password // Password sent in headers for verification
        }
      });
      const data = await res.json();
      if (res.ok) {
        alert('User deleted successfully');
        document.cookie.split(";").forEach((cookie) => {
            const [name] = cookie.split("=");
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        });
        window.location.href = '/'; // Redirect to login page after deletion
      } else {
        alert(data.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }
      
    // Open modals
    function openEmailModal() {
      selectedUser = { ...user };
      newEmail = selectedUser.email;
      showEmailModal = true;
    }
  
    function openPasswordModal() {
      selectedUser = { ...user };
      showPasswordModal = true;
    }
  
    // Close modals
    function closeEmailModal() {
      showEmailModal = false;
    }
  
    function closePasswordModal() {
      showPasswordModal = false;
    }
  
    // Function to update the email
    async function updateEmail() {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}/email`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'password': password // Password sent in headers
          },
          body: JSON.stringify({ email: newEmail })
        });
        const data = await res.json();
        if (res.ok) {
          alert('Email updated successfully');
          await getData(userId); // Refresh user details
          closeEmailModal();
        } else {
          alert(data.error || 'Failed to update email');
        }
      } catch (err) {
        console.error('Error updating email:', err);
      }
    }
  
    // Function to update the password
    async function updatePassword() {
      if (newPassword !== confirmNewPassword) {
        alert('Passwords do not match');
        return;
      }
  
      try {
        const res = await fetch(`http://localhost:3000/api/users/${userId}/password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'password': password // Password sent in headers
          },
          body: JSON.stringify({ newPassword })
        });
        const data = await res.json();
        if (res.ok) {
          alert('Password updated successfully');
          closePasswordModal();
        } else {
          alert(data.error || 'Failed to update password');
        }
      } catch (err) {
        console.error('Error updating password:', err);
      }
    }
  </script>
  
  <div class="container mt-5">
    <div class="card mx-auto" style="max-width: 600px; border-radius: 10px;">
      <div class="card-body text-center">
        <h1 class="card-title">Profile</h1>
  
        {#if user}
        <img src={pic + user.name} alt="User Avatar" class="rounded-circle mb-3" style="width: 150px; height: 150px;">
        <div class="mt-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email} <button class="btn m-0 p-0" on:click={openEmailModal}>✏</button></p>
          <p><strong>Password:</strong> *********** <button class="btn m-0 p-0" on:click={openPasswordModal}>✏</button></p>
          <button class="btn btn-danger mt-3" on:click={openDeleteModal}>Delete Account</button>

        </div>
        {/if}
      </div>
    </div>
  </div>
  
  <!-- Email Update Modal -->
  {#if showEmailModal}
    <div class="modal show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Email</h5>
            <button type="button" class="btn-close" on:click={closeEmailModal}></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="newEmail" class="form-label">New Email</label>
              <input type="email" id="newEmail" class="form-control" bind:value={newEmail} />
            </div>
  
            <div class="mb-3">
              <label for="password" class="form-label">Current Password</label>
              <input type="password" id="password" class="form-control" bind:value={password} />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" on:click={closeEmailModal}>Close</button>
            <button type="button" class="btn btn-primary" on:click={updateEmail}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  {/if}
  
  <!-- Password Update Modal -->
  {#if showPasswordModal}
    <div class="modal show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Password</h5>
            <button type="button" class="btn-close" on:click={closePasswordModal}></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="newPassword" class="form-label">New Password</label>
              <input type="password" id="newPassword" class="form-control" bind:value={newPassword} />
            </div>
            <div class="mb-3">
              <label for="confirmNewPassword" class="form-label">Confirm New Password</label>
              <input type="password" id="confirmNewPassword" class="form-control" bind:value={confirmNewPassword} />
            </div>
  
            <div class="mb-3">
              <label for="password" class="form-label">Current Password</label>
              <input type="password" id="password" class="form-control" bind:value={password} />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" on:click={closePasswordModal}>Close</button>
            <button type="button" class="btn btn-primary" on:click={updatePassword}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  {/if}
  {#if showDeleteModal}
  <div class="modal show d-block" tabindex="-1" style="background-color: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Confirm Account Deletion</h5>
          <button type="button" class="btn-close" on:click={closeDeleteModal}></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <div class="mb-3">
            <label for="password" class="form-label">Enter your password to confirm</label>
            <input type="password" id="password" class="form-control" bind:value={password} />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" on:click={closeDeleteModal}>Cancel</button>
          <button type="button" class="btn btn-danger" on:click={deleteUser}>Delete</button>
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
  