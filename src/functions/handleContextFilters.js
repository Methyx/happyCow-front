import Cookies from "js-cookie";

export const saveContextFilters = async (
  restaurants,
  healthStore,
  vegStore,
  iceCream,
  others,
  vegan,
  vegetarian,
  vegOption,
  titleOnly,
  isMiniRating,
  miniRating,
  favoritesOnly
) => {
  let category = "";
  if (restaurants) {
    category += "+0";
  }
  if (healthStore) {
    category += "+1";
  }
  if (vegStore) {
    category += "+2";
  }
  if (iceCream) {
    category += "+12";
  }
  if (others) {
    category += "+3+4+5+6+7+8+9+10+11+13+14+99";
  }
  if (category) {
    category = category.slice(1);
  }
  let type = "";
  if (vegan) {
    type += "+vegan";
  }
  if (vegetarian) {
    type += "+vegetarian";
  }
  if (vegOption) {
    type += "+veg-options";
  }
  if (type) {
    type = type.slice(1);
  }
  const filters = {
    titleOnly: titleOnly,
    category: category,
    type: type,
    favoritesOnly: favoritesOnly,
  };
  if (isMiniRating) {
    filters.miniRating = miniRating + 1;
  } else {
    filters.miniRating = 0;
  }
  Cookies.set("happyCow-ContextFilters", JSON.stringify(filters));
};

export const loadContextFilters = async (
  setRestaurants,
  setHealthStore,
  setVegStore,
  setIceCream,
  setOthers,
  setVegan,
  setVegetarian,
  setVegOption,
  setTitleOnly,
  setIsMiniRating,
  setMiniRating,
  setFavoritesOnly
) => {
  const filtersTxt = await Cookies.get("happyCow-ContextFilters");
  if (filtersTxt) {
    const filters = JSON.parse(filtersTxt);
    const categories = filters.category.split("+");
    await setRestaurants(categories.includes("0"));
    await setHealthStore(categories.includes("1"));
    await setVegStore(categories.includes("2"));
    await setIceCream(categories.includes("12"));
    await setOthers(categories.includes("99"));
    const types = filters.type.split("+");
    await setVegan(types.includes("vegan"));
    await setVegetarian(types.includes("vegetarian"));
    await setVegOption(types.includes("veg-options"));
    await setTitleOnly(filters.titleOnly);
    if (filters.miniRating > 0) {
      await setIsMiniRating(true);
      await setMiniRating(filters.miniRating - 1);
    } else {
      await setIsMiniRating(false);
      await setMiniRating(0);
    }
    await setFavoritesOnly(filters.favoritesOnly);
  }
};
