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
  
  <h1>Sign Up</h1>
  <form on:submit|preventDefault={signup}>
    <label>
      Name:
      <input type="text" bind:value={name} />
    </label>
    <label>
      Email:
      <input type="email" bind:value={email} />
    </label>
    <label>
      Password:
      <input type="password" bind:value={password} />
    </label>
    <button type="submit">Sign Up</button>
  </form>
  

  <a href="/signin">Already have an account? Sign in</a>
  