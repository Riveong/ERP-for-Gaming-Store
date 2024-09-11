export async function load({ fetch, params }) {
  const { name } = params; // Extract category from params

  // Debugging to check if the category is being passed correctly
  console.log('Name:', name);

  try {
    // Directly use the category in the URL path
    const response = await fetch(`http://localhost:3000/api/products/name/${name}`);
    
    if (!response.ok) {
      // Log status and statusText for more detailed error information
      console.error('Failed to fetch data:', response.status, response.statusText);
      return { data: [], name };
    }

    const data = await response.json();
    
    // Debugging to check if the data is being fetched correctly
    console.log('Fetched Data:', data);

    return { data, name }; // Return the fetched data and category
  } catch (error) {
    // Log any unexpected errors that might occur during fetch
    console.error('Error fetching data:', error);
    return { data: [], name };
  }
}
