const elTopProducts = findElement(".products__list");
const elTopTemplate = findElement("#product-template");
renderProducts(uzum, elTopProducts);
function findElement(el, parent = document) {
  return parent.querySelector(el);
}
