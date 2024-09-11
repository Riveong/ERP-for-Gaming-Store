<script context="module">
    import { redirect } from '@sveltejs/kit';
  
    export async function load({ cookies }) {
      cookies.delete('auth', { path: '/' });
      throw redirect(302, '/login');
    }
  </script>
  