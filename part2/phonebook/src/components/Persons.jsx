import noteServices from "../services/notes";

const Persons = ({ visiblePersons, setVisiblePersons }) => {
  return (
    <div>
      {visiblePersons.map((entry) => {
        return (
          <p key={entry.name}>
            {entry.name} {entry.number}{" "}
            <button
              onClick={() => {
                const result = window.confirm(`Delete ${entry.name}?`);
                if (result) {
                  noteServices.deleteNote(entry.id).then(
                    setVisiblePersons(
                      visiblePersons.filter((person) => {
                        return person.id !== entry.id;
                      })
                    )
                  );
                }
              }}
            >
              Delete?
            </button>
          </p>
        );
      })}
    </div>
  );
};
export default Persons;
