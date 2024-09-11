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
  <div class="p-5 m-5 text-center">
  <h1 class="text-lg">Sign In</h1>
  <p>please login to continue</p>
  <form on:submit|preventDefault={signin}>
    <label>
      Email:<br>
      <input type="email" bind:value={email} />
    </label><br>
    <label>
      Password:<br>
      <input type="password" bind:value={password} />
    </label><br>
    <button class="mt-5" type="submit">Sign In</button>
  </form>
  <a href="/signup">Don't have an account? Sign up</a>
  </div>
