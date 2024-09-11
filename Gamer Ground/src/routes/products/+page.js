export async function load({ fetch }) {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      
      if (response.ok) {
        const data = await response.json();
        return { data };
      } else {
        console.error('Failed to fetch data:', response.statusText);
        return { data: [] };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return { data: [] };
    }
  }