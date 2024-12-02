import PersonDetails from "./PersonDetails";

const PersonsList = ({ peopleToDisplay, onDeletePerson }) => {
  return (
    <>
      {peopleToDisplay.map((person) => (
        <PersonDetails key={person.name} person={person} onDeletePerson={onDeletePerson}/>
      ))}
    </>
  );
}

export default PersonsList