/* eslint-disable react/prop-types */
const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by <em>{anecdote.author}</em>
      </h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see{" "}
        <a href={anecdote.info} target="_blank" rel="noreferrer">
          {anecdote.info}
        </a>
      </div>
      <br />
    </div>
  );
};

export default Anecdote;
