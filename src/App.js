import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [container, setContainer] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://amazon24.p.rapidapi.com/api/product",
      params: {
        categoryID: "aps",
        keyword: "iphone",
        country: "US",
        page: "1"
      },
      headers: {
        "X-RapidAPI-Host": "amazon24.p.rapidapi.com",
        "X-RapidAPI-Key": "bc8006d48amsh69e5064484e98b7p16d73bjsn37edd8bac393"
      }
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setContainer(response.data.docs);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const conts = container?.slice(0, 7);

  return (
    <div className="App">
      {conts.map((item) => (
        <div>
          <img src={item.product_main_image_url} alt="" />
          <a href={item.product_detail_url}>
            <h1>{item.product_title}</h1>
          </a>
          <p>Price: {item.app_sale_price}</p>
        </div>
      ))}
    </div>
  );
}
