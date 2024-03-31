import { useEffect, React, useState } from "react";
import { Link } from "react-router-dom";

const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

const ComicInfo = ({ title, price, thumbnail, ID }) => {
  return (
    <div>
      <li className="container flex gap-20 items-center justify-between border-b-4">

      {thumbnail ? <img className="w-[200px] h-[300px] mb-3" src={thumbnail}/> : <div className="w-[200px] h-[300px]"></div>}

      <Link
        className="text-white"
        to={`/comicDetails/${ID}`}
        key={ID}
      >
        <h2 className="text-lg">{title}</h2>
      </Link>

        {price !== "N/A" ? (
          <h2 className="text-lg">${price}</h2>
        ) : <h2 className="text-lg">{price}</h2>}
      </li>
    </div>
  )



};

export default ComicInfo;
