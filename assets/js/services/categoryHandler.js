let category = "";

function setCategory(e) {
  category = e.target.getAttribute("data-category");
  saveCategory(category);
}

function saveCategory(category) {
  localStorage.setItem("selectedCategory", category);
}

export { setCategory }
