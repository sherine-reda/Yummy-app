let homeMeals = document.getElementById("homeMeals");
let Search = document.getElementById("Search");
let submitBtn = document.getElementById("submitBtn");
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

$(document).ready(function () {
  // $("#details div:first").css("display", "block");
  // $("#details h3").click(function () {
  //   $(this).next().slideToggle(500);
  //   $("#details div").not($(this).next()).slideUp(500);
  // });
});
function openNav() {
  if ($("#mySidenav").width() == "250") {
    closeNav();
  } else {
    $("#mySidenav").width("250px");
    $(".content").css("margin-left", "250px");
    $(".openNav").html("");
    $(".openNav").html("&times;");
    $(".nav-footer").css("left", "0");
    for (let i = 0; i < 5; i++) {
      $(".sidenav ul li")
        .eq(i)
        .animate(
          {
            top: 0,
          },
          (i + 5) * 100
        );
    }
  }
}
function closeNav() {
  $("#mySidenav").width("0px");
  $(".content").css("margin-left", "0px");
  $(".openNav").html("");
  $(".openNav").html("&#9776;");
  $(".nav-footer").css("left", "-150px");
  $(".sidenav ul li").animate(
    {
      top: 300,
    },
    500
  );
}
async function getApiMeals() {
  $(".loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".loading-screen").fadeOut(300);
}
function displayMeals(res) {
  let cartona = "";
  for (let i = 0; i < res.length; i++) {
    cartona += `<div class="col-md-3">
    <div onclick="getMealDetails('${res[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2">
        <img class="w-100" src="${res[i].strMealThumb}" alt="" srcset="">
        <div class="overlflow   d-flex align-items-center text-black p-2">
            <h3>${res[i].strMeal}</h3>
        </div>
      
    </div>
   
</div>`;
  }
  homeMeals.innerHTML = cartona;
}
getApiMeals();
async function getMealDetails(id) {
  $(".inner-loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();
  displayMealsDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}
function displayMealsDetails(res) {
  Search.innerHTML = "";
  let Ingredient = ``;
  for (let i = 0; i <= 20; i++) {
    if (res[`strIngredient${i}`]) {
      Ingredient += `<li class="alert alert-info m-2 p-1">${
        res[`strMeasure${i}`]
      } ${res[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = res.strTags?.split(",");
  if (!tags) tags = [];
  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
  <div class="col-md-4">
              <img class="w-100 rounded-3" src="${res.strMealThumb}"
                  alt="">
                  <h2>${res.strMeal}</h2>
          </div>
          <div class="col-md-8">
              <h2>Instructions</h2>
              <p>${res.strInstructions}</p>
              <h3><span class="fw-bolder">Area : </span>${res.strArea}</h3>
              <h3><span class="fw-bolder">Category : </span>${res.strCategory}</h3>
              <h3>Recipes :</h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
                  ${Ingredient}
              </ul>
              <h3>Tags :</h3>
              <ul class=" p-0 d-flex g-3 flex-wrap">
                  ${tagsStr}
              </ul>

              <a target="_blank" href="${res.strSource}" class="btn btn-success">Source</a>
              <a target="_blank" href="${res.strYoutube}" class="btn btn-danger">Youtube</a>
          </div>`;

  homeMeals.innerHTML = cartoona;
}
function searchInputs() {
  homeMeals.innerHTML = " ";

  cartona = `<div class="col-md-6 mb-5">
  <input type="text"  oninput=searchByName(this.value) placeholder="Search By Name" class="form-control bg-transparent text-white">
 </div>
 <div class="col-md-6 mb-5">
  <input type="text" oninput=searchByLetter(this.value) placeholder="Search By First Letter" class="form-control bg-transparent text-white" maxlength="1">
 </div>`;
  Search.innerHTML = cartona;
}
async function searchByName(value) {
  homeMeals.innerHTML = " ";
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );
  response = await response.json();
  if (response.meals) {
    displayMeals(response.meals);
  } else {
    displayMeals([]);
  }
  $(".inner-loading-screen").fadeOut(300);
}
async function searchByLetter(value) {
  $(".inner-loading-screen").fadeIn(300);
  homeMeals.innerHTML = " ";
  value == "" ? (value = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
  );
  response = await response.json();
  if (response.meals) {
    displayMeals(response.meals);
  } else {
    displayMeals([]);
  }
  $(".inner-loading-screen").fadeOut(300);
}
async function getCategories() {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCategories(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}
function displayCategories(res) {
  let cartona = "";
  Search.innerHTML = "";
  for (let i = 0; i < res.length; i++) {
    cartona += `<div class="col-md-3">
    <div onclick="getMealCategories('${
      res[i].strCategory
    }')" class="meal position-relative overflow-hidden rounded-2">
        <img class="w-100" src="${res[i].strCategoryThumb}" alt="" srcset="">
        <div class="overlflow  text-black p-2">
            <h3 class="text-center">${res[i].strCategory}</h3>
            <p class="text-center">${res[i].strCategoryDescription
              .split(" ")
              .slice(0, 20)
              .join(" ")}</p>
        </div>
      
    </div>
   
</div>`;
  }
  homeMeals.innerHTML = cartona;
}
async function getMealCategories(meal) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}
async function getArea() {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}
function displayArea(res) {
  let cartona = "";
  Search.innerHTML = "";
  for (let i = 0; i < res.length; i++) {
    cartona += `<div class="col-md-3 text-center">
    <div onclick="getMealArea('${res[i].strArea}')" class="meal position-relative overflow-hidden rounded-2">
    <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${res[i].strArea}</h3>
</div>
   
</div>`;
  }
  homeMeals.innerHTML = cartona;
}
async function getMealArea(area) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();
  displayMeals(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}
async function getIngredients() {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  response = await response.json();
  displayIngredients(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
function displayIngredients(res) {
  let cartona = "";
  Search.innerHTML = "";
  for (let i = 0; i < res.length; i++) {
    cartona += `<div class="col-md-3 text-center">
    <div onclick="getMealIngredients('${
      res[i].strIngredient
    }')" class="meal position-relative overflow-hidden rounded-2">
    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${res[i].strIngredient}</h3>
            <p>${res[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
</div>
   
</div>`;
  }
  homeMeals.innerHTML = cartona;
}
async function getMealIngredients(Ingredients) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`
  );
  response = await response.json();
  displayMeals(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}
function getFormContact() {
  Search.innerHTML = "";
  cartona = `
  <div class="col-md-6">
  <input
    type="text"
    class="form-control"
    placeholder="Enter Your Name"
    id="inputName"
    oninput="nameValdiation(),submit()"
  />
  <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
    Special characters and numbers not allowed
  </div>
</div>
<div class="col-md-6">
  <input
    type="email"
    class="form-control"
    placeholder="Enter Your Email"
    id="inputEmail"
    oninput="emailValdiation(),submit()"
  />
  <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
    Email not valid *exemple@yyy.zzz
  </div>
</div>
<div class="col-md-6">
  <input
    type="text"
    class="form-control"
    placeholder="Enter Your Phone"
    id="inputPhone"
    oninput="phoneValdiation(),submit()"
  />
  <div id="PhoneAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid Phone Number (11 digit)
  </div>
</div>
<div class="col-md-6">
  <input
    type="number"
    class="form-control"
    placeholder="Enter Your Age"
    id="inputAge"
    oninput="ageValdiation(),submit()"
  />
  <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid age
  </div>
</div>
<div class="col-md-6">
  <input
    type="password"
    class="form-control"
    placeholder="Enter Your Password"
    id="inputPassword"
    oninput="passwordValdiation(),submit()"
  />
  <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid password *Minimum eight characters, at least one letter and one number:*
  </div>
</div>
<div class="col-md-6">
  <input
    type="password"
    class="form-control"
    placeholder="Repassword"
    id="inputRepassword"
    oninput="repasswordValdiation(),submit()"
  />
  <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
    Enter valid password
  </div>
</div>
<div class="col-md-3 text-center ">
<button id="submitBtn" disabled="true"  class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>

  `;
  homeMeals.innerHTML = cartona;
  document.getElementById("inputName").addEventListener("focus", () => {
    nameInputTouched = true;
  });
  document.getElementById("inputEmail").addEventListener("focus", () => {
    emailInputTouched = true;
  });
  document.getElementById("inputPhone").addEventListener("focus", () => {
    phoneInputTouched = true;
  });
  document.getElementById("inputAge").addEventListener("focus", () => {
    ageInputTouched = true;
  });
  document.getElementById("inputPassword").addEventListener("focus", () => {
    passwordInputTouched = true;
  });
  document.getElementById("inputRepassword").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}
function nameValdiation() {
  let regx = /^[a-zA-Z]+$/;
  if (nameInputTouched) {
    if (regx.test(document.getElementById("inputName").value)) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
      return false;
    }
  }
}
function emailValdiation() {
  let regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailInputTouched) {
    if (regx.test(document.getElementById("inputEmail").value)) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
      return false;
    }
  }
}
function phoneValdiation() {
  let regx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/;
  if (phoneInputTouched) {
    if (regx.test(document.getElementById("inputPhone").value)) {
      document
        .getElementById("PhoneAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("PhoneAlert")
        .classList.replace("d-none", "d-block");
      return false;
    }
  }
}
function ageValdiation() {
  let regx = /^[1-9][0-9]?$/;
  if (ageInputTouched) {
    if (regx.test(document.getElementById("inputAge").value)) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
      return false;
    }
  }
}
function passwordValdiation() {
  let regx = /^(?=.*\d)(.)*(?=.*[a-z])[0-9a-zA-z]{8,}$/;
  if (passwordInputTouched) {
    if (regx.test(document.getElementById("inputPassword").value)) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
      return false;
    }
  }
}
function repasswordValdiation() {
  if (repasswordInputTouched) {
    if (
      document.getElementById("inputRepassword").value ==
      document.getElementById("inputPassword").value
    ) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
      return true;
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
      return false;
    }
  }
}
function submit() {
  if (
    nameValdiation() &&
    emailValdiation() &&
    phoneValdiation() &&
    ageValdiation() &&
    passwordValdiation() &&
    repasswordValdiation()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", true);
  }
}
