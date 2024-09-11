<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import Header from '$lib/Header.svelte';
    import Footer from '../lib/footer.svelte';
</script>
<Header brand="Gamer Ground" />
<slot />
<Footer />