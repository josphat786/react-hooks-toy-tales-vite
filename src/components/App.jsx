import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  // Main source of truth for full CRUD data sync
  const [toys, setToys] = useState([]);

  // 1. READ (GET): Fetch all toys when the app loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error("Error loading toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // 2. CREATE (POST): Handler passed to ToyForm to add a toy
  function handleAddToy(newToyFromServer) {
    setToys([...toys, newToyFromServer]);
  }

  // 3. UPDATE (PATCH): Handler passed to ToyContainer -> ToyCard to increment likes
  function handleLikeToy(updatedToyFromServer) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToyFromServer.id ? updatedToyFromServer : toy
    );
    setToys(updatedToys);
  }

  // 4. DELETE (DELETE): Handler passed to ToyContainer -> ToyCard to drop a toy
  function handleDeleteToy(deletedToyId) {
    const remainingToys = toys.filter((toy) => toy.id !== deletedToyId);
    setToys(remainingToys);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* Pass state array and action handlers downward to the presentation tree */}
      <ToyContainer 
        toys={toys} 
        onLikeToy={handleLikeToy} 
        onDeleteToy={handleDeleteToy} 
      />
    </>
  );
}

export default App;
