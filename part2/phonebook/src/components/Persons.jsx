import personServices from "../services/person";

const Persons = ({
  visiblePersons,
  setVisiblePersons,
  setPersons,
  setNotification,
}) => {
  return (
    <div>
      {visiblePersons.map((entry) => {
        return (
          <p key={entry.name}>
            {entry.name} {entry.number}{" "}
            <button
              onClick={() => {
                const userAnswer = window.confirm(`Delete ${entry.name}?`);
                if (userAnswer) {
                  personServices
                    .deleteNote(entry.id)
                    .then(() => {
                      setVisiblePersons(
                        visiblePersons.filter((person) => {
                          return person.id !== entry.id;
                        })
                      );
                      setPersons(
                        visiblePersons.filter((person) => {
                          return person.id !== entry.id;
                        })
                      );
                      setNotification({
                        message: `Deleted ${entry.name}`,
                        success: true,
                      });
                      setTimeout(() => {
                        setNotification({
                          message: null,
                          success: false,
                        });
                      }, 5000);
                    })
                    .catch((err) => {
                      let message = "";
                      if (err.status === 404) {
                        message = `Couldn't delete the entry. \nThe item is not present in the server: ${err.status}, ${err.response.data}`;
                      } else {
                        message = `Couldn't delete the entry. \ ${err.message} error occured.`;
                      }
                      setNotification({
                        message: message,
                        success: false,
                      });
                      setTimeout(() => {
                        setNotification({
                          message: null,
                          success: false,
                        });
                      }, 5000);
                      // update the UI states
                      personServices.getAll().then((res) => {
                        setPersons(res);
                        setVisiblePersons(res);
                      });
                    });
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
