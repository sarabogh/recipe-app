import React, { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from "./pages/Home";
import SearchRecipes from "./pages/SearchRecipes";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecipeModal from "./components/RecipeModal";

import sampleTopRecipes from "./data/SampleTopRecipes";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <>
      <nav>
        <Link to="/" className="logo">
          <span className="logo-heart">🤍</span>Taste of Home
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/search">Search Recipes</Link>
          {currentUser && <Link to="/favorites">Favorites</Link>}
          <Link
            to="/login"
            onClick={() => currentUser && setCurrentUser(null)}
          >
            {currentUser ? "Logout" : "Login"}
          </Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <Home
              topRecipes={sampleTopRecipes}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setSelectedRecipe={setSelectedRecipe}
            />
          }
        />
        <Route
          path="/search"
          element={
            <SearchRecipes
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setSelectedRecipe={setSelectedRecipe}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              setSelectedRecipe={setSelectedRecipe}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/register"
          element={<Register setCurrentUser={setCurrentUser} />}
        />
      </Routes>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </>
  );
}

export default App;