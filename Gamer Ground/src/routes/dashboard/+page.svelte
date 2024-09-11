<script>
    import Dashboard from './Dashboard.svelte';
    import DaftarBarang from './DaftarBarang.svelte';
    import TambahBarang from './TambahBarang.svelte';
    import EditBarang from './EditBarang.svelte';
    import DaftarNota from './DaftarNota.svelte';
  
    let currentMenu = 'Dashboard';
  
    function selectMenu(menu) {
      currentMenu = menu;
    }
  </script>
  
  <main class="p-5 d-flex flex-column">
    <div class="container-fluid flex-fill m-0">
      <div class="row h-100">
        <div class="col-2 bg-white border p-5 h-100">
          <h2>Menu</h2>
          <a href="#" on:click="{() => selectMenu('Dashboard')}">Dashboard</a><br>
          <a href="#" on:click="{() => selectMenu('DaftarBarang')}">Daftar Barang</a><br>
          <a href="#" on:click="{() => selectMenu('TambahBarang')}">Tambah Barang</a><br>
          <a href="#" on:click="{() => selectMenu('EditBarang')}">Edit Barang</a><br>
          <a href="#" on:click="{() => selectMenu('DaftarNota')}">Daftar Nota</a><br>
          <a href="/logout">Logout</a>
        </div>
        <div class="col-10 bg-white border p-2 h-100">
          {#if currentMenu === 'Dashboard'}
            <Dashboard title="Dashboard" />
          {:else if currentMenu === 'DaftarBarang'}
            <DaftarBarang title="Daftar Barang" />
          {:else if currentMenu === 'TambahBarang'}
            <TambahBarang title="Tambah Barang" />
          {:else if currentMenu === 'EditBarang'}
            <EditBarang title="Edit Barang" />
          {:else if currentMenu === 'DaftarNota'}
            <DaftarNota title="Daftar Nota" />
          {/if}
        </div>
      </div>
    </div>
  </main>
  