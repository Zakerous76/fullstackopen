import { filterAnecdotes } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();
  const handleFilter = (param) => {
    const filterValue = param.target.value;
    dispatch(filterAnecdotes(filterValue));
  };
  return (
    <div>
      <label htmlFor="filter">Filter </label>
      <input type="text" id="filter" onChange={handleFilter} />
    </div>
  );
};

export default Filter;
