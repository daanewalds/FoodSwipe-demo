import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  {
    id: 3,
    title: "Loaded Burger",
    image: "https://source.unsplash.com/featured/?burger",
    healthy: false,
    difficulty: "Medium",
    price: "€€€",
    time: "45 min",
    type: "Dinner",
  },
];

export default function FoodswipeApp() {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 flex flex-col items-center justify-center px-4 py-8 text-gray-800">
      {screen === "welcome" && (
        <div className="text-center space-y-6 animate-fade-in">
          <img src="/logo.png" alt="Foodswipe logo" className="w-24 h-24 mx-auto rounded-full shadow-md" />
          <h1 className="text-4xl font-extrabold tracking-tight">Welcome to <span className="text-orange-500">FoodSwipe</span></h1>
          <p className="text-gray-600">Find your next meal with a swipe.</p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow" onClick={() => setScreen("filter")}>Get Started</Button>
        </div>
      )}

      {screen === "filter" && (
        <div className="space-y-6 w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-semibold text-center">Set your preferences</h2>
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full" onClick={() => setScreen("swipe")}>See Recipes</Button>
        </div>
      )}

      {screen === "swipe" && recipe && (
        <div className="w-full max-w-md animate-slide-up">
          <Card className="rounded-2xl shadow-xl overflow-hidden">
            <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
            <CardContent className="p-5 space-y-3">
              <h3 className="text-2xl font-bold">{recipe.title}</h3>
              <div className="text-sm text-gray-600 flex flex-wrap gap-2">
                <span>{recipe.type}</span>
                <span>•</span>
                <span>{recipe.time}</span>
                <span>•</span>
                <span>{recipe.price}</span>
                <span>•</span>
                <span>{recipe.healthy ? "🌿 Healthy" : "🍟 Unhealthy"}</span>
                <span>•</span>
                <span>{recipe.difficulty}</span>
              </div>
              <div className="flex justify-between pt-4">
                <Button onClick={() => swipe(false)} variant="outline" className="rounded-full px-6 py-2">👎 Skip</Button>
                <Button onClick={() => swipe(true)} className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2">❤️ Like</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {screen === "favorites" && (
        <div className="w-full max-w-md space-y-4 animate-fade-in">
          <h2 className="text-3xl font-bold text-center">Your Favorites</h2>
          {favorites.length === 0 && <p className="text-center text-gray-500">You haven't liked any recipes yet.</p>}
          {favorites.map((fav) => (
            <Card key={fav.id} className="rounded-xl overflow-hidden shadow-md">
              <CardContent className="flex gap-4 items-center p-2">
                <img src={fav.image} alt={fav.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h4 className="font-semibold">{fav.title}</h4>
                  <p className="text-sm text-gray-600">{fav.type} · {fav.time}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
