import React, { useState, useEffect } from "react";
import errorImage from "../../Assets/error.png";

export default function Result({ list, fetchMe }) {
  const [num, setNum] = useState(0);
  useEffect(() => {
    fetchMe(num);
  }, [num]);
  const check = (e) => {
    e.target.checked ? setNum(num + 1) : setNum(num - 1);
  };

  return (
    <ul className="youtube-list">
      {list.map((el) =>
        list.length > 1 ? (
          <li key={el.id.videoId}>
            <label htmlFor={el.snippet.thumbnails.default.url}>
              <img src={el.snippet.thumbnails.default.url} alt="" />
              <h6>{el.snippet.title}</h6>
            </label>
            <input
              type="checkbox"
              name="videos"
              id={el.snippet.thumbnails.default.url}
              value={el.snippet.thumbnails.default.url}
              onChange={check}
            />
          </li>
        ) : (
          <li>
            <img src={errorImage} alt="" />
            <h6>{list[0]}</h6>
          </li>
        )
      )}
    </ul>
  );
}
