const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((entry) => {
        return (
          <p key={entry.name}>
            {entry.name} {entry.number}
          </p>
        );
      })}
    </div>
  );
};
export default Persons;
