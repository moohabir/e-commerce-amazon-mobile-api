import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [container, setContainer] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
      params: { ingr: +{ query } },
      headers: {
        "X-RapidAPI-Host": "edamam-food-and-grocery-database.p.rapidapi.com",
        "X-RapidAPI-Key": "bc8006d48amsh69e5064484e98b7p16d73bjsn37edd8bac393"
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data["hints"]);
        setContainer(response.data["hints"]);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [query]);

  const conts = container?.slice(0, 7);

  function submitHandler(event) {
    event.preventDefault();
    setQuery(query);
  }

  return (
    <div className="App">
      <div className="app-list">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        {conts.map((item) => (
          <div className="items">
            <img src={item.food.image} alt="" />
            <h1>{item.food.label}</h1>
            <p>{item.food.foodContentsLabel}</p>
            <p>
              ingredierents: fat: {item.food.nutrients.FAT}
              <span> CHOCDF: {item.food.nutrients.CHOCDF}</span>
              <span> Energy: {item.food.nutrients.ENERC_KCAL}</span>
              <span> fibbtg: {item.food.nutrients.FIBTG}</span>
              <span> PROCNT :{item.food.nutrients.PROCNT}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
