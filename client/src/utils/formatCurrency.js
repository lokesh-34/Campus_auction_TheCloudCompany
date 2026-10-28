/**
 * Convert integer paise to formatted Indian Rupee (₹) string.
 * @param {number} paise - Amount in integer paise
 * @returns {string} e.g. "₹1,500" or "₹1,500.50"
 */
export function formatPaiseToRupees(paise) {
  if (typeof paise !== 'number' || isNaN(paise)) {
    return '₹0';
  }
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: paise % 100 === 0 ? 0 : 2,
  }).format(rupees);
}

/**
 * Convert rupee input (number or string) to integer paise safely.
 * @param {number|string} rupees
 * @returns {number} integer paise
 */
export function rupeesToPaise(rupees) {
  const numeric = typeof rupees === 'string' ? parseFloat(rupees) : rupees;
  if (isNaN(numeric) || numeric < 0) {
    return 0;
  }
  return Math.round(numeric * 100);
}
