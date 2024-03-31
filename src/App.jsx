import { useState, useEffect } from "react";
import "./App.css";
import md5 from "md5";
import ComicInfo from "./Components/ComicInfo.jsx";
import DropDown from "./Components/DropDown.jsx";
import Card from "./Components/Card.jsx"

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;
const DEFAULT_NO_IMAGE =
  "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

const App = () => {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState(null);
  const [searchFormat, setSearchFormat] = useState("");
  const [searchTitle, setSearchTitle] = useState("");

  // Create hash for url
  const generateHash = (timestamp) => {
    return md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  };

  // Retrieve comic data
  useEffect(() => {
    const fetchAllComics = async () => {
      const currentTime = new Date().getTime();
      const hash = generateHash(currentTime);
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/comics?apikey=${PUBLIC_KEY}&hash=${hash}&ts=${currentTime}&limit=100`
      );
      const json = await response.json();
      setList(json);
    };
    fetchAllComics().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchTitle(searchValue);
    setFilteredResults(list.data.results.filter((comic) => (
      comic.title.toLowerCase().includes(searchValue.toLowerCase())
    )))
  };

  const averagePrice = () => {
    if (filteredResults && filteredResults.length > 0) {
      const prices = filteredResults.reduce((acc, comic) => {
        const price = comic.prices[0]?.price;
        if (price) {
          acc.push(price);
        }
        return acc;
      }, []);
  
      if (prices.length > 0) {
        const sumPrice = prices.reduce((acc, price) => acc + price, 0);
        return (sumPrice / prices.length).toFixed(2); // Return the average price rounded to 2 decimal places
      } else {
        return "N/A";
      }
    } else {
      return "N/A";
    }
  };

  const averagePage = () => {
    if (filteredResults && filteredResults.length > 0) {
      const pages = filteredResults.reduce((acc, comic) => {
        const page = comic.pageCount;
        if (page) {
          acc.push(page);
        }
        return acc;
      }, []);

      if (pages.length > 0) {
        const sumPage = pages.reduce((acc, page) => acc + page, 0);
        return (sumPage / pages.length).toFixed(2); // Return the average price rounded to 2 decimal places
      } else {
        return "N/A";
      }
    } else {
      return "N/A";
    }
  };

  const searchByFormat = (userFormat) => {
    setSearchFormat(userFormat);
  
    if (userFormat === "Any") {
      if (searchTitle) {
        setFilteredResults(
          list.data.results.filter((comic) =>
            comic.title.toLowerCase().includes(searchTitle.toLowerCase())
          )
        );
      } else {
        setFilteredResults(list.data.results);
      }
      return;
    }
  
    if (searchTitle) {
      setFilteredResults(
        filteredResults.filter(
          (comic) =>
            comic.format.toLowerCase() === userFormat.toLowerCase() &&
            comic.title.toLowerCase().includes(searchTitle.toLowerCase())
        )
      );
    } else {
      setFilteredResults(
        list.data.results.filter(
          (comic) => comic.format.toLowerCase() === userFormat.toLowerCase()
        )
      );
    }
  };

  return (
    <div className="container">
      <h1 className="text-5xl font-bold font-sans">Super Comic Marvel Database</h1>

      <div className="container flex justify-center gap-10 mt-10">
        <Card
          data={filteredResults ? filteredResults.length : 0}
          description="Number of Results"
        />
        <Card
          data={filteredResults && filteredResults.length > 0 ? "$" + String(averagePrice()) : "$0.00"}
          description="Average Price"
        />
        <Card
          data={filteredResults && filteredResults.length > 0 ? Math.ceil(averagePage()) : 0}
          description="Average Pages"
        />
      </div>

      <div className="container flex justify-evenly flex-row h-[50px] my-5">
        <input
          className="border-solid border border-gray-500 h-[40px] w-[500px] p-5 rounded-lg"
          type="text"
          placeholder="Search for a Comic..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <DropDown
          currentFormat={searchByFormat}
        />      
      </div>

      <div className="border-solid border-gray-500 border rounded-lg overflow-scroll h-[1000px] bg-gray-800 text-white">
        <ul className="flex flex-col gap-5 p-5">
          {filteredResults
            ? filteredResults.map((comic) => (
                <ComicInfo
                  key={comic.id}
                  ID={comic.id}
                  thumbnail={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  title={comic.title}
                  price={comic.prices[0]?.price || "N/A"}
                />
              ))
            : list &&
              list.data.results.map((comic) => (
                <ComicInfo
                  key={comic.id}
                  ID={comic.id}
                  thumbnail={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  title={comic.title}
                  price={comic.prices[0]?.price || "N/A"}
                />
              ))}
        </ul>
      </div>

    </div>
  );
};

export default App;
