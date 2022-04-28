const search=document.getElementById("search")
const submit=document.getElementById("submit");
const random=document.getElementById("random");
const mealEl=document.getElementById("meals");
const res_heading=document.querySelector(".meal_heading");
const single_meal=document.getElementById("single_meal");
const mealsss=document.getElementById("meals");



function searchMeal(e){
  mealEl.style.display="grid";
    e.preventDefault();

    single_meal.innerHTML="";
 const term=search.value;
if(term.trim()){
  let result=  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  result.then(res => res.json()).then(data=> {
      res_heading.innerHTML=`<h2> Search result for ${term}`;

      console.log(data);
    
   
      if(data.meals===null){
          res_heading.innerHTML=`<h2> There are no result for ${term}`;
          console.log(nuhff);
      }
      else{
          mealEl.innerHTML=data.meals.map(
             (meal)=> `
              <div class="meal"> <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            

              <div class="meal_info" data-mealID="${meal.idMeal}"> 
              <h3>${meal.strMeal}
              </div>
              </div>
              `
          )
          .join("");
         
      }
  })
}
else{
    alert("please write something in box");
}




}

function getMealById(mealID) {
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    )
      .then((res) => res.json())
      .then((data) => {
          const meal=data.meals[0];
          addMealtoDOM(meal);
      });
  }

  function addMealtoDOM(meal) {
    mealEl.style.display="none";
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${
            meal[`strMeasure${i}`]
          }`
        );
      }else{
        mealEl.innerHTML="";
          break;
      }
    }
   
    single_meal.innerHTML = `
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
    ${ingredients.map(ing => `<li>${ing}</li>`)}
    </ul>
    </div>
    </div>
    `
  }
  function randomMeal(){

    mealsss.innerHTML="";
    
    res_heading.innerHTML='';

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
        const meal = data.meals[0];
        addMealtoDOM(meal);
    })

}
  

submit.addEventListener("submit",searchMeal);
random.addEventListener("click",randomMeal);
mealEl.addEventListener("click", (e) => {
    const mealInfo = e.path.find((item) => {
      if (item.classList) {
        return item.classList.contains("meal_info");
      } else {
        return false;
      }
    });
    if (mealInfo) {
      const mealID = mealInfo.getAttribute(
        "data-mealid"
      );
      getMealById(mealID);
    }
  });