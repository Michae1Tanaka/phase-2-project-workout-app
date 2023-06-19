import React, { useEffect, useState } from "react";

function HomeWorkoutsPage() {
  const [workoutsDisplay, setWorkoutsDisplay] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/workouts");
        const workoutsFromFetch = await response.json();
        setWorkoutsDisplay(workoutsFromFetch);
      } catch (error) {
        console.alert(error);
      }
    }
    fetchData();
  }, []);
  return <div>{workoutsDisplay.map((workout) => console.log(workout))}</div>;
}

export default HomeWorkoutsPage;
