export const formatCurrency = (value) => {
    if (typeof value === "number") {
      value = value.toFixed(2).toString();
    } else if (typeof value !== "string") {
      return value;
    }
  
    let formattedValue = value.replace(/\D/g, "");
    formattedValue = (formattedValue / 100).toFixed(2).replace(".", ",");
  
    let parts = formattedValue.split(",");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return "R$ " + parts.join(",");
  };
  
  export const isValidPrice = (value) => {
    const numericValue = value.replace(/[^\d,-]/g, "").replace(",", ".");
    return !isNaN(parseFloat(numericValue)) && isFinite(numericValue);
  };