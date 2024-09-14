<script>
    import Dashboard from './Dashboard.svelte';
    import DaftarBarang from './DaftarBarang.svelte';
    import TambahBarang from './TambahBarang.svelte';
    import EditBarang from './EditBarang.svelte';
    import DaftarNota from './DaftarNota.svelte';
    import TambahAdmin from './TambahAdmin.svelte';
  
    let currentMenu = 'Dashboard';
  
    function selectMenu(menu) {
      currentMenu = menu;
    }
  </script>
  
  <main class="p-3 d-flex flex-column">
    <div class="container-fluid flex-fill m-0">
      <div class="row">
        <!-- Sidebar Toggle Button (visible only on mobile) -->
        <button class="btn btn-primary d-md-none mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          ☰ Menu
        </button>
  
        <!-- Sidebar (Collapsible on mobile) -->
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="position-sticky pt-3">
            <h2 class="h5">Menu</h2>
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link" href="#" on:click="{() => selectMenu('Dashboard')}">Dashboard</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" on:click="{() => selectMenu('DaftarBarang')}">Daftar Barang</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" on:click="{() => selectMenu('TambahBarang')}">Tambah Barang</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" on:click="{() => selectMenu('EditBarang')}">Edit Barang</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" on:click="{() => selectMenu('DaftarNota')}">Daftar Nota</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" on:click="{() => selectMenu('TambahAdmin')}">Tambah Admin</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-danger" href="/logout">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
  
        <!-- Main Content Area -->
        <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
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
          {:else if currentMenu === 'TambahAdmin'}
            <TambahAdmin title="TambahAdmin" />
          {/if}
        </div>
      </div>
    </div>
  </main>
  
  <style>
    .sidebar {
      background-color: #f8f9fa;
      min-height: 100vh;
    }
  
    .sidebar .nav-link {
      font-size: 1rem;
      color: #333;
      margin-bottom: 0.5rem;
    }
  
    .sidebar .nav-link:hover {
      color: #007bff;
    }
  
    .sidebar .nav-link.active {
      font-weight: bold;
      color: #007bff;
    }
  
    /* For mobile screens, reduce padding and margins */
    @media (max-width: 767.98px) {
      .p-3 {
        padding: 1rem !important;
      }
  
      .btn {
        padding: 0.5rem 1rem;
      }
  
      .nav-link {
        padding: 0.5rem;
      }
    }
  </style>
  