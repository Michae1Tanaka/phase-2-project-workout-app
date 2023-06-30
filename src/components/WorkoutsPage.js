import React, { useContext } from "react";
import WorkoutCard from "./WorkoutCard";
import { v4 as uuid } from "uuid";
import { Button, Card, Segment, Header, Icon } from "semantic-ui-react";
import { WorkoutContext } from "../context/WorkoutContextProvider";
import { Link } from "react-router-dom";

function WorkoutsPage() {
  const { activeItem, filteredWorkouts } = useContext(WorkoutContext);

  const workoutGroups = ["Bicep", "Back", "Chest", "Tricep", "Shoulder", "Leg"].reduce((groups, group) => {
    groups[group] = filteredWorkouts
      .filter((workout) => workout.muscleGroup === group)
      .map((workout) => <WorkoutCard key={uuid()} workout={workout} />);
    return groups;
  }, {});

  return (
    <div>
      {Object.keys(workoutGroups).map((group) => (
        <div key={uuid()}>
          {(activeItem === "workouts" || activeItem.toLowerCase() === group.toLowerCase()) &&
          workoutGroups[group].length > 0 ? (
            <h1 style={{ textAlign: "center" }}>{group} Workouts </h1>
          ) : null}
          <Card.Group itemsPerRow="3">{workoutGroups[group]}</Card.Group>
          {activeItem.toLowerCase() === group.toLowerCase() && workoutGroups[group].length === 0 ? (
            <>
              <Segment placeholder style={{ marginTop: "60px" }}>
                <Header icon>
                  <Icon name="ban" />
                  There are no {group.toLowerCase()} workouts saved.
                </Header>
                <Button
                  as={Link}
                  to={"/add-workout"}
                  color="green"
                  style={{ maxWidth: "20%", display: "block", margin: "0 auto" }}
                >
                  Add Workout
                </Button>
              </Segment>
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default WorkoutsPage;