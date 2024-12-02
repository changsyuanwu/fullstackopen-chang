const PersonDetails = ({ person }) => (
  <p key={person.name}>
    {person.name} {person.number}
  </p>
);

export default PersonDetails