import { useEffect } from "react";
import { useState } from "react";
import Result from "./components/Result";
import SearchBox from "./components/SearchBox";

function App() {
  const [searchResult, setSearchResult] = useState([]);

  return (
    <>
      <div className="searchBox">
        <SearchBox setSearchResult={setSearchResult} />
      </div>
      <Result searchResult={searchResult} setSearchResult={setSearchResult} />
    </>
  );
}

export default App;
