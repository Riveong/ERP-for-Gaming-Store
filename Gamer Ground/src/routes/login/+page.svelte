<script>
  export let data = {};

</script>

<form class="p-5 m-5 text-center" method="post">
  <h1 class="mb-5">Login admin dashboard</h1>
  <p class="mb-5">Please enter your username and password</p>
  <label>
    Username<br>
    <input type="text" name="username" required />
  </label><br>
  <label>
    Password<br>
    <input type="password" name="password" required />
  </label><br>
  <button class="btn btn-dark m-5" type="submit">Login</button>
</form>
