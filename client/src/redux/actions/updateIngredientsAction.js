import axios from 'axios';

//send new set of ingredients to server
//reset state with selected ingredients,
//suggested ingredients
//and recipes
export function updateIngredients (ingredients) {
  return {
    type: 'UPDATE_INGREDIENTS',
    ingredients
  }


  // return function(dispatch) {
  //     axios.post('/login', { 
  //         email: email,
  //         password :password 
  //     })    
  // }
}
