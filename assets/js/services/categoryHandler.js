function setCategory(e) {
  let category = e.target.getAttribute("data-category");
  saveCategory(category);
}

function saveCategory(category) {
  localStorage.setItem("selectedCategory", category);
}

export { setCategory }
