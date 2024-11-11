// ? DO we need to initialize empty string or can this be done in function?
let category = '';

// Set Category
function setCategory(e) {
  category = e.target.getAttribute("data-category");
  saveCategory(category)
}

// Save Category to Localstorage
function saveCategory(category) {
  localStorage.setItem('selectedCategory', category);
}

export {setCategory}
