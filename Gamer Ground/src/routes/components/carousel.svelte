<script>
    import { onMount, onDestroy } from "svelte";
    import car1 from "$lib/images/slide1.png";
    import car2 from "$lib/images/slide2.png";

    let currentIndex = 0;
    let images = [
      car1,
      car2,
      "https://via.placeholder.com/600x300/7fff7f/333333?text=Slide+3",
    ];
  
    let interval;
  
    onMount(() => {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    });
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % images.length;
    }
  
    function prevSlide() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
  
    function goToSlide(index) {
      currentIndex = index;
    }
  
    onDestroy(() => {
      clearInterval(interval);
    });
  </script>
  
  <style>
    .carousel {
      position: relative;
      width: 100%;
      height: 60vh;
      overflow: hidden;
    }
  
    .slides {
      display: flex;
      transition: transform 0.5s ease-in-out;
      width: 100%;
      height: 100%;
    }
  
    .slide {
      min-width: 100%;
      max-width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  
    .slide img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  
    .controls {
      position: absolute;
      top: 50%;
      width: 100%;
      display: flex;
      justify-content: space-between;
      transform: translateY(-50%);
      pointer-events: none;
    }
  
    .controls button {
      background-color: rgb(0, 0, 0);
      border: none;
      color: rgb(255, 255, 255);
      padding: 10px;
      cursor: pointer;
      pointer-events: all;
    }
  
    .dots {
      text-align: center;
      position: absolute;
      bottom: 20px;
      width: 100%;
    }
  
    .dots button {
      border: none;
      background: #ccc;
      width: 14px;
      height: 15px;
      border-radius: 50%;
      margin: 0 5px;
      cursor: pointer;
    }
  
    .dots button.active {
      background: #ffffff;
    }
  </style>
  
  
  <div class="carousel">
    <div
      class="slides"
      style="transform: translateX({-currentIndex * 100}%)"
    >
      {#each images as image}
        <div class="slide">
          <img src={image} alt="Slide" />
        </div>
      {/each}
    </div>
  
    <div class="controls">
      <button on:click={prevSlide}>❮</button>
      <button on:click={nextSlide}>❯</button>
    </div>
  
    <div class="dots">
      {#each images as _, i}
        <button
          class={i === currentIndex ? "active" : ""}
          on:click={() => goToSlide(i)}
        ></button>
      {/each}
    </div>
  </div>
  