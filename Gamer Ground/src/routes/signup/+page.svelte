<script>
    let name = '';
    let email = '';
    let password = '';
  
    const signup = async () => {
      const res = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
  
      if (res.ok) {
        alert('Sign up successful');
      } else {
        const error = await res.json();
        alert(error.message);
      }
    };
  </script>
  
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <div class="card-body text-center">
        <h1 class="card-title text-center h3 mb-4">Sign Up</h1>
        <p>Please register your account!</p>
        <form on:submit|preventDefault={signup}>
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" class="form-control" id="name" bind:value={name} required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email:</label>
            <input type="email" class="form-control" id="email" bind:value={email} required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input type="password" class="form-control" id="password" bind:value={password} required />
          </div>
          <button type="submit" class="btn btn-dark w-100 mt-3">Sign Up</button>
          <div class="mt-4">
            <a href="/signin" class="text-decoration-none">Already have an account? Sign in</a>
          </div>        
        </form>
      </div>
    </div>
  </div>
  


  