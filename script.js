const getMealBtn = document.getElementById('get-meal');
const mealContainer = document.getElementById('meal');

getMealBtn.addEventListener('click', () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
      const meal = res.meals[0];
      const ingredients = createMeal(meal);
      const newInnerHTML = `
      <div class="row">
      <div class="columns five">
          <div class="meal-info">
              <img src="${meal.strMealThumb}" alt="Meal Image">
              <div class="meal-description">
                  <h4> <span style="background-color:#ffc93c;">${meal.strMeal}</span></h4>
                  <p>${meal.strInstructions}</p>
              </div>
          </div>
          <div>
          ${meal.strCategory ? `<p><span style="background-color:#e46161 ;">Category:</span> ${meal.strCategory}</p>` : ''}
          ${meal.strArea ? `<p><span style="background-color:#e46161 ;">Area:</span> ${meal.strArea}</p>` : ''}
        </div>
        <div class= "border-image"><img src="http://dl9.glitter-graphics.net/pub/1147/1147989nsg8oi6ik5.gif" width=440 height=27 border=0></a><br><a  </a> </div>
        <h5><span style="background-color:#cbf078;">Ingredients</span> <img src="http://dl4.glitter-graphics.net/pub/3070/3070264u78h7t3mdo.gif" width="50" height="50" border="0"></h5>

          <ul >
              ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
      </div>
      <div>        <div class= "border-image"><img src="http://dl9.glitter-graphics.net/pub/1147/1147989nsg8oi6ik5.gif" width=440 height=27 border=0></a><br><a  </a> </div></div>
      <div class="columns seven">
          ${meal.strYoutube ? `
          <div class="row">
              <h5><span style="background-color:#8ef6e4 ;">Video Recipe</span></h5>
              <div class="videoWrapper">
                  <iframe width="420" height="315"
                  src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
                  </iframe>
              </div>
          </div>` : ''}
      </div>
  </div>
      `;
      mealContainer.innerHTML = newInnerHTML;
    })
    .catch(e => console.warn(e));
});

const createMeal = meal => {
  const ingredients = [];

  // Loop through the ingredient list and add each non-empty ingredient to the array
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }

  return ingredients;
};
