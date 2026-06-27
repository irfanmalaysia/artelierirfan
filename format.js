export function priceLabel(amount) {
  return `RM ${amount}`;
}

export function totalSales(products) {
  return products.reduce((sum, p) => sum + (parseFloat(p.sales) || 0), 0);
}

export function initialsFromName(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function coverBgImage(src) {
  return src ? `url("${src}")` : 'none';
}
