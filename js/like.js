const favoriteTemplate = findElement("#favourite__template");
const elList = findElement("#favorite__products");
const elFavoriteFlex = findElement(".wish__filter-flex");
const elFilterSvg = findElement(".wish__filterbox svg");
const elFilterText = findElement(".wish__filterbox p");
const elFavoriteFilter = findElement(".wish__filter");
const elFavoriteFilterButton = findElement(".wish__btns");
const elFilterOption = document.querySelectorAll(".wish__btn");
const elFavoriteTitle = findElement(".wish__title");
let favouriteProducts = [];

fetching();

function fetching() {
  fetch(`https://63e8d48f4f3c6aa6e7c38741.mockapi.io/fakeapi/`)
    .then((res) => res.json())
    .then((data) => {
      const result = data.filter((product) => {
        if (product.isFavorite) {
          return product;
        }
      });

      favouriteProducts = result;

      if (favouriteProducts.length == 0) {
        elFavoriteTitle.textContent = "You Don't Have a Favorite Product";
        elFavoriteTitle.style.color = "red";
        elFavoriteFilter.style.display = "none";
      }

      renderProducts(result, 0, 0, elList, favoriteTemplate, true);
    });
}

elList.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.id.includes("favorite-btn") || target.id === "path") {
    const id = Number(target.dataset.id);

    favouriteProducts.forEach((product) => {
      if (+product.id === id) {
        product.isFavorite = !product.isFavorite;

        fetch(`https://63e8d48f4f3c6aa6e7c38741.mockapi.io/fakeapi/${id}`, {
          method: "put",
          body: JSON.stringify({
            ...product,
            isFavorite: product.isFavorite,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            fetching();
          });
      }
    });
  }
});

elFilterOption.forEach((element) => {
  element.addEventListener("click", () => {
    if (
      element.value.toLowerCase().trim() ===
      element.textContent.toLowerCase().trim()
    ) {
      element.style.color = "#6E00FF";
      elFilterText.textContent = element.value;
    } else {
      element.style.color = "#111517";
    }
  });
});

elFavoriteFlex.addEventListener("click", () => {
  if (elFavoriteFlex.className.includes("flex")) {
    elFilterSvg.style.transform = "rotate(0)";
    elFavoriteFilterButton.style.opacity = 1;
    elFavoriteFilterButton.style.pointerEvents = "auto";
    elFavoriteFlex.className = "favorite__filterbox none";
    elFavoriteFlex.style.border = "1px solid #131417";
  } else if (elFavoriteFlex.className.includes("none")) {
    elFavoriteFilterButton.style.opacity = 0;
    elFavoriteFlex.style.border = "1px solid transparent";
    elFilterSvg.style.transform = "rotate(180deg)";
    elFavoriteFlex.className = "favorite__filterbox flex";
  }
});
