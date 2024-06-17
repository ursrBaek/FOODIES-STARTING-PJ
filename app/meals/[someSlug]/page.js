import React from "react";

function MealsSomePage({ params }) {
  return (
    <main>
      <div>MealsSomePage</div>
      <p>{params.someSlug}</p>
    </main>
  );
}

export default MealsSomePage;
