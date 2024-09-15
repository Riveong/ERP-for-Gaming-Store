<script>
    import promo1 from '$lib/images/promo1.png';
    import promo2 from '$lib/images/promo2.png';
    import promo3 from '$lib/images/promo3.jpg';
</script>

<h1 class="fw-normal text-center p-5">ALL NEW AND <b>FRESH!</b></h1>
<p class="fw-light text-center">PRODUK BARU KAMI MENANTIMU!</p>
<div class="container mt-5">
    <div class="d-flex flex-wrap justify-content-between card-group">
        <div class="card" style="width: 20rem;">
            <center><img src="{promo1}" class="card-img-top" style="width: 150px;" alt="Card image 1"></center>
            <div class="card-body">
                <h5 class="card-title">RTX 4060 TI</h5>
                <p class="card-text">The GeForce RTX 4060 is part of NVIDIA’s Ada Lovelace architecture.
                    It features 3,072 CUDA cores.</p>
            </div>
        </div>
        <div class="card" style="width: 20rem;">
            <center><img src="{promo2}" class="card-img-top" style="width: 200px;" alt="Card image 2"></center>
            <div class="card-body">
                <h5 class="card-title">ROG Zephyrus Duo 15</h5>
                <p class="card-text">The ROG Zephyrus Duo 15 GX550LXS from ASUS is a powerful, pinnacle laptop.</p>
            </div>
        </div>
        <div class="card" style="width: 20rem;">
            <center><img src="{promo3}" class="card-img-top" style="width:140px" alt="Card image 3"></center>
            <div class="card-body">
                <h5 class="card-title">Logitech G502 Hero</h5>
                <p class="card-text">G502 HERO features an advanced optical sensor for maximum tracking accuracy across the full DPI range.</p>
            </div>
        </div>
    </div>
    <a href="/products" class="btn btn-dark mt-5">Lihat Semua Produk</a>
</div>


<style>
    .card {
        border-radius: 0;
        margin-bottom: 1rem;
        border: none;
    }
    .card-group {
        gap: 1rem;
    }
    .card-text {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        max-height: 60px;
    }
    @media (max-width: 767px) {
        .card-group {
                flex-direction: column;
                align-items: center;
            }
        }
</style>