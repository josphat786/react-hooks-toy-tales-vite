import React from "react";

function ToyCard({ toy, onLikeToy, onDeleteToy }) {
  // Extracting data properties from our individual toy object
  const { id, name, image, likes } = toy;

  // 1. UPDATE (PATCH): When like button clicked -> patch database -> update state
  function handleLikeClick() {
    const updatedLikes = likes + 1;

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToyFromServer) => onLikeToy(updatedToyFromServer))
      .catch((error) => console.error("Error updating likes:", error));
  }

  // 2. DELETE (DELETE): When Donate clicked -> delete from database -> update state
  function handleDeleteClick() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteToy(id))
      .catch((error) => console.error("Error deleting toy:", error));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDeleteClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
