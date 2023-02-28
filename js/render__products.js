function renderProducts(array) {
  array.slice(0, 20).forEach((product) => {
    const newProduct = elTopTemplate.content.cloneNode(true);

    const elTitle = findElement(".products__name", newProduct);
    const elPrice = findElement(".products__price", newProduct);
    const elRating = findElement(".products__rating span", newProduct);
    const elImg = findElement(".products__img", newProduct);
    const elSubPrice = findElement(".products__subprice", newProduct);
    const elBtnBasket = newProduct.querySelector("#button-basket");

    elTitle.textContent = product.name;
    elSubPrice.textContent = product.subprice * 500 + ".00" + "сум";
    elPrice.textContent = product.price * 100 + ".00" + "сум";
    elRating.textContent = product.rating;
    elImg.textContent = product.image;
    elBtnBasket.title = `${product.name}`;

    elTopProducts.appendChild(newProduct);
  });
}
