import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [container, setContainer] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
      params: { ingr: "apple" },
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
  }, []);

  const conts = container?.slice(0, 7);

  return (
    <div className="App">
      <div className="app-list">
        {conts.map((item) => (
          <div className="items">
            <img src={item.food.image} alt="" />
            <h1>{item.food.label}</h1>
            <p>{item.food.nutrients.FAT}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
