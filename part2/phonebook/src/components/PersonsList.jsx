import PersonDetails from "./PersonDetails";

const PersonsList = ({ peopleToDisplay }) => {
  return (
    <>
      {peopleToDisplay.map((person) => (
        <PersonDetails key={person.name} person={person} />
      ))}
    </>
  );
}

export default PersonsList