import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchRecipes = async (query) => {
  const res = await axios.get(`${BASE_URL}/search.php`, {
    params: { s: query },
  });
  return res.data.meals || [];
};

export const getCategories = async () => {
  const res = await axios.get(`${BASE_URL}/categories.php`);
  return res.data.categories || [];
};

export const filterByIngredient = async (ingredient) => {
  const res = await axios.get(`${BASE_URL}/filter.php`, {
    params: { i: ingredient },
  });
  return res.data.meals || [];
};

export const filterByCategory = async (category) => {
  const res = await axios.get(`${BASE_URL}/filter.php`, {
    params: { c: category },
  });
  return res.data.meals || [];
};

export const getRecipeById = async (id) => {
  const res = await axios.get(`${BASE_URL}/lookup.php`, {
    params: { i: id },
  });
  return res.data.meals ? res.data.meals[0] : null;
};
