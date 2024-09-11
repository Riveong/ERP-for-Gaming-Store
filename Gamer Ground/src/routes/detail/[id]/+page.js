export async function load({ fetch, params }) {
  const { id } = params;

  try {
    const queryParams = new URLSearchParams({
      id: id
    });

    const response = await fetch(`http://localhost:3000/api/detail?${queryParams.toString()}`);
    
    if (response.ok) {
      const data = await response.json();
      return { data, id };
    } else {
      console.error('Failed to fetch data:', response.statusText);
      return { data: [], id };
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return { data: [], id };
  }
}
