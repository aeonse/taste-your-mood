// const express = require('express');
// const path = require('path')
// const app = express();
// const axios = require('axios'); 

// app.use(express.static(path.join(__dirname)));
// const PORT = 3000;

// const fs = require('fs');
// const config = JSON.parse(fs.readFileSync('config.json'));
// const apiToken = config.api_token;

// app.get('/dish/:type', async (req, res) => {
//     const type = req.params.type;

//     const options = {
//         method: 'GET',
//         url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser',
//         params: { ingr: type },
//         headers: {
//             'X-RapidAPI-Key': apiToken,
//             'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
//         }
//     };

  



//     try {
//         const response = await axios.request(options);
//         let dishes = response.data.hints.map(dish => dish.food.label);
        
//         // Remove duplicates
//         dishes = Array.from(new Set(dishes));

//         // Remove keyword and filter out empty results
//         dishes = dishes.map(dish => dish.replace(new RegExp(type, 'gi'), '').trim())
//                        .filter(dish => dish !== '');

//         res.json(dishes);
//     } catch (error) {
//         console.error("Error fetching dishes:", error);
//         res.status(500).json({ error: "Failed to fetch dishes" });
//     }

// });


// app.set('view engine', 'ejs');

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require('express');
const path = require('path')
const app = express();
const axios = require('axios');



app.use(express.static(path.join(__dirname)));
const PORT = 3000;

const { TOKEN } = require('./config.js');

// const fs = require('fs');
// const config = JSON.parse(fs.readFileSync('config.json'));
// const apiToken = config.api_token;




app.get('/dish/:type', async (req, res) => {
  const type = req.params.type;

  const options = {
      method: 'GET',
      url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser',
      params: { ingr: type },
      headers: {
          'X-RapidAPI-Key': 'TOKEN',
          'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
      }
  };


  try {
      const response = await axios.request(options);
      let dishes = response.data.hints.map(dish => dish.food.label);
    
      // Remove duplicates
      dishes = Array.from(new Set(dishes));

      // Remove keyword and filter out empty results
      dishes = dishes.map(dish => dish.replace(new RegExp(type, 'gi'), '').trim())
                     .filter(dish => dish !== '');


      res.json(dishes);
  } catch (error) {
      console.error("Error fetching dishes:", error);
      res.status(500).json({ error: "Failed to fetch dishes" });
  }




});


// app.get('/random-dish', async (req, res) => {
//  const API_KEY = '1';
//  const API_URL = `https://www.themealdb.com/api/json/v1/${API_KEY}/random.php`;


//  try {
//      const response = await axios.get(API_URL);
//      if (response.data && response.data.meals && response.data.meals.length > 0) {
//          const dishName = response.data.meals[0].strMeal;
//          res.json({ dish: dishName });
//      } else {
//          res.status(404).json({ error: "No random dish found." });
//      }
//  } catch (error) {
//      console.error("Error fetching random dish from themealdb:", error);
//      res.status(500).json({ error: "Failed to fetch random dish from themealdb API." });
//  }
// });


app.set('view engine', 'ejs');



app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
