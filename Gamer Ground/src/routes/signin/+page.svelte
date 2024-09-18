<script>
    let email = '';
    let password = '';
  
    const signin = async () => {
      const res = await fetch('http://localhost:3000/api/signin', { // Ensure the API URL is correct
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (res.ok) {
        const data = await res.json();
        
        // Set the userId cookie if the login is successful
        document.cookie = `Id=${data.Id}; path=/;`;
        document.cookie = `userId=${data.userId}; path=/;`;
        window.location.replace('/'); // Reload the page to reflect the login state
      } else {
        const error = await res.json();
        alert(error.message); // Show error message if login fails
      }
    };
  </script>
<div class="container d-flex justify-content-center align-items-center min-vh-100">
  <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
    <div class="card-body text-center">
      <h1 class="card-title h3 mb-3">Sign In</h1>
      <p class="card-text mb-4">Please login to continue</p>
      <form on:submit|preventDefault={signin}>
        <div class="mb-3">
          <label for="email" class="form-label">Email:</label>
          <input type="email" class="form-control" id="email" bind:value={email} required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password:</label>
          <input type="password" class="form-control" id="password" bind:value={password} required />
        </div>
        <button class="btn btn-dark w-100 mt-3" type="submit">Sign In</button>
      </form>
      <div class="mt-4">
        <a href="/signup" class="text-decoration-none">Don't have an account? Sign up</a>
      </div>
    </div>
  </div>
</div>
