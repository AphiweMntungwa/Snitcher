import React, { useEffect, useState } from "react";
import Box from "../Box/Box";
import Result from "./Result";
import axios from "axios";

export default function Youtube({fetchMe}) {
  const [searchParam, setParam] = useState("");
  const [data, setData] = useState([]);
  const [obj, setObj] = useState([]);

  useEffect(() => {
    setData(obj);
  }, [obj]);

  const setSearch = async () => {
    try {
      const response = await axios.post('https://snitcher-server.herokuapp.com/search', { searchParam });
      let res = response.data.items
        ? response.data.items
        : ["somethin's wrong"];
      setObj(res);
    } catch (e) {
      console.log(`something went wrong :${e}`);
    }
  };

  return (
    <Box boxClass="card youtube-card">
      <span className="card-header">
        <input
        className="youtube-search-field"
          type="search"
          value={searchParam}
          onChange={(e) => setParam(e.target.value)}
        />
        <button onClick={() => setSearch()}>
          <i className="fas fa-search"></i>
        </button>
      </span>
      <Box boxClass="youtube-search">
        <Result list={data} fetchMe={fetchMe} />
      </Box>
    </Box>
  );
}
