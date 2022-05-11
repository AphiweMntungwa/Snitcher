import React, { useEffect, useState } from "react";
import Box from "../Box/Box";
import Result from "./Result";
import axios from "axios";
import Loader from "../Utils/Loader";

export default function Youtube({ fetchMe }) {
  const [searchParam, setParam] = useState("");
  const [data, setData] = useState([]);
  const [obj, setObj] = useState([]);
  const [find, onSearch] = useState(false);
  const [loading, load] = useState(false);

  useEffect(() => {
    setData(obj);
  }, [obj]);

  function setSearch(e) {
    load(true);
    axios
      .post("http://localhost:8080/search", {
        searchParam,
      })
      .then((res) => {
        load(false);
        setObj(res.data.items);
      })
      .catch((e) => {
        load(e.message);
      });
  }

  return (
    <div className="youtube-card">
      <div>
        <h4 onClick={() => onSearch(!find)}>Search videos</h4>
        {find && (
          <section>
            <input
              className="youtube-search-field"
              type="search"
              value={searchParam}
              onChange={(e) => setParam(e.target.value)}
            />
            <span onClick={() => setSearch()}> &#128269; </span>
          </section>
        )}
      </div>

      {typeof loading === "string" && (
        <Loader error={loading} errorMsg={loading} />
      )}
      {loading === true ? (
        <Loader />
      ) : find ? (
        typeof loading === "boolean" && (
          <>
            {data.length > 0 && (
              <div className="youtube-search">
                <Result list={data} fetchMe={fetchMe} />
              </div>
            )}
          </>
        )
      ) : null}
    </div>
  );
}
