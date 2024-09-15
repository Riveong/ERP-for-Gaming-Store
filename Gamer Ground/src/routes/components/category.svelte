<script>
    export let data;
    let searchQuery = '';
    import next from '$lib/images/next.png';
    import pc from '$lib/images/pc.png';
    import laptop from '$lib/images/laptop.png';
    import mouse from '$lib/images/mouse.png';
    import keyboard from '$lib/images/keyboard.png';
    import monitor from '$lib/images/monitor.png';
    import spareparts from '$lib/images/spareparts.png';
    import comp from '$lib/images/comp.webp';


  function handleEnter(event) {
    if (event.key === 'Enter' && searchQuery) {
      // Redirect to the new URL
      window.location.href = `http://localhost:5173/products/filter/${encodeURIComponent(searchQuery)}`;
    }
  }

</script>
  
<h1 class="fw-normal text-center p-5">KATALOG KAMI</h1>
<p class="fw-light text-center">TEMUKAN PRODUK YANG KAMU INGINKAN</p>
<div class="container mt-5">
    <center>
        <input type="text" class="form-control mb-5" style="width:100%" placeholder="Cari produk..." bind:value={searchQuery} on:keypress={handleEnter}>
    </center>
    <div class="row g-3">
        <div class="col-12 col-sm-6 col-md-3">
            <div class="card h-100 bg-dark text-white" style="background-image: url({pc}); background-position: center; background-size: cover;">
                <div class="card-body text-center">
                    <a href="/products/pc%20rakitan" class="text-decoration-none text-white">
                        <h5 class="card-title">pc rakitan</h5>
                        <img src={next} width="20px">
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
            <div class="card h-100 bg-dark text-white" style="background-image: url({laptop}); background-position: center; background-size: cover;">
                <div class="card-body text-center">
                    <a href="/products/laptop" class="text-decoration-none text-white">
                        <h5 class="card-title">Laptop</h5>
                        <img src={next} width="20px">
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
            <div class="card h-100 bg-dark text-white" style="background-image: url({mouse}); background-position: center; background-size: cover;">
                <div class="card-body text-center">
                    <a href="/products/mouse" class="text-decoration-none text-white">
                        <h5 class="card-title">Mouse</h5>
                        <img src={next} width="20px">
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
            <div class="card h-100 bg-dark text-white" style="background-image: url({keyboard});  background-position: center; background-size: cover;">
                <div class="card-body text-center">
                    <a href="/products/keyboard" class="text-decoration-none text-white">
                        <h5 class="card-title">Keyboard</h5>
                        <img src={next} width="20px">
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
            <div class="card h-100 bg-dark text-white" style="background-image: url({monitor});  background-position: center; background-size: cover;">
                <div class="card-body text-center">
                    <a href="/products/monitor" class="text-decoration-none text-white">
                        <h5 class="card-title">Monitor</h5>
                        <img src={next} width="20px">
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
            <div class="card h-100 bg-dark text-white" style="background-image: url({spareparts}); background-position: center; background-size: cover;">
                <div class="card-body text-center">
                    <a href="/products/spareparts" class="text-decoration-none text-white">
                        <h5 class="card-title">Spareparts</h5>
                        <img src={next} width="20px">
                    </a>
                </div>
            </div>
        </div>
        <div class="col-12 col-sm-6 col-md-6">
            <div class="card h-100 bg-dark text-white" style="background-image: url({comp}); background-position: center; background-size: cover;">
                <div class="card-body text-center">
                    <a href="/products" class="text-decoration-none text-white">
                        <h5 class="card-title">All Products</h5>
                        <img src={next} width="20px">
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .card:hover {
        transform: scale(1.05);
        transition: transform 0.3s;
    }
    .card {
        border: none;
        overflow: hidden;
    }
</style>
