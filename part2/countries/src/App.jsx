import { useEffect } from "react";
import { useState } from "react";
import Result from "./components/Result";
import SearchBox from "./components/SearchBox";
import countriesService from "./services/countries";

function App() {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <>
      <div className="searchBox">
        <SearchBox setSearchResult={setSearchResult} />
      </div>
      <Result searchResult={searchResult} />
    </>
  );
}

export default App;
