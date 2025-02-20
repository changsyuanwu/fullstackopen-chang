const PersonDetails = ({ person, onDeletePerson }) => (
  <p key={person.name}>
    {person.name} {person.number} <button onClick={()=> onDeletePerson(person)}>delete</button>
  </p>
);

export default PersonDetails