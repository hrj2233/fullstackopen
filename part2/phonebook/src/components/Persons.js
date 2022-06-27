const Persons = ({ persons, searchName, handleDeletePerson }) => {
  const displayNumbers = () => {
    const filteredPersons = persons.filter((person) => {
      let name = person.name.toLowerCase();
      let search = searchName.toLowerCase();
      return name.includes(search);
    });

    return filteredPersons.map((person) => (
      <li key={person.name}>
        {person.name} {person.number} <button onClick={() => handleDeletePerson(person.id, person.name)}>delete</button>
      </li>
    )
    );
  };
  return (
    <ul>
      {displayNumbers()}
    </ul>
  );
};
export default Persons;