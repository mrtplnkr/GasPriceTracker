export async function fetchGasPrices() {
  try {
    const response = await fetch('/priceData.json');
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
