
import React, { useState } from "react";

const dummyRecipes = [
  {
    id: 1,
    title: "Spaghetti Bolognese",
    image: "https://source.unsplash.com/featured/?spaghetti",
    healthy: true,
    difficulty: "Easy",
    price: "€€",
    time: "30 min",
    type: "Dinner",
  },
  {
    id: 2,
    title: "Avocado Toast",
    image: "https://source.unsplash.com/featured/?avocado",
    healthy: true,
    difficulty: "Easy",
    price: "€",
    time: "10 min",
    type: "Breakfast",
  },
];

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [current, setCurrent] = useState(0);
  const [favorites, setFavorites] = useState([]);

  const recipe = dummyRecipes[current];

  const swipe = (liked) => {
    if (liked) setFavorites([...favorites, recipe]);
    if (current < dummyRecipes.length - 1) setCurrent(current + 1);
    else setScreen("favorites");
  };

  return (
    <div style={{ padding: 20 }}>
      {screen === "welcome" && (
        <div>
          <h1>Welcome to FoodSwipe</h1>
          <button onClick={() => setScreen("filter")}>Get Started</button>
        </div>
      )}

      {screen === "filter" && (
        <div>
          <h2>Set your preferences</h2>
          <button onClick={() => setScreen("swipe")}>See Recipes</button>
        </div>
      )}

      {screen === "swipe" && recipe && (
        <div>
          <img src={recipe.image} alt={recipe.title} width="300" />
          <h3>{recipe.title}</h3>
          <p>{recipe.type} · {recipe.time} · {recipe.price}</p>
          <button onClick={() => swipe(false)}>Skip</button>
          <button onClick={() => swipe(true)}>Like</button>
        </div>
      )}

      {screen === "favorites" && (
        <div>
          <h2>Your Favorites</h2>
          {favorites.map(fav => (
            <div key={fav.id}>
              <img src={fav.image} alt={fav.title} width="100" />
              <p>{fav.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
