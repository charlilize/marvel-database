import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import md5 from "md5";
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

const ComicDetail = () => {
  // Create hash for url
  const generateHash = (timestamp) => {
    return md5(timestamp + PRIVATE_KEY + PUBLIC_KEY);
  };
  
  let params = useParams();
  const [fullDetails, setFullDetails] = useState(null);

  // Retrieve comic data
  useEffect(() => {
      const fetchComic = async () => {
      const currentTime = new Date().getTime();
      const hash = generateHash(currentTime);
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/comics/${params.comicid}?apikey=${PUBLIC_KEY}&hash=${hash}&ts=${currentTime}`,      
      );
      const json = await response.json();
      setFullDetails(json);
    };
    
    fetchComic().catch(console.error);
  }, [params.comicid]);

  return (
    <div className="container text-black flex-col">
      {fullDetails && fullDetails.data.results[0] ? (
        <>
          <h1>{fullDetails.data.results[0].title}</h1>
          <img
            src={`${fullDetails.data.results[0].thumbnail.path}.${fullDetails.data.results[0].thumbnail.extension}`}
          />
          <p>
            {fullDetails.data.results[0].textObjects[0]?.text.replace(
              /<br>/g,
              "",
            )}
          </p>
          <table>
            <tbody>
              <tr>
                <th>Page Count</th>
                <td>{fullDetails.data.results[0].pageCount}</td>
              </tr>
              <tr>
                <th>Number of Creators</th>
                <td>{fullDetails.data.results[0].creators.available}</td>
              </tr>
              <tr>
                <th>Issue #:</th>
                <td>{fullDetails.data.results[0].issueNumber}</td>
              </tr>
              <tr>
                <th>Link to website</th>
                <td>
                  <a href={fullDetails.data.results[0].urls[0].url}>
                    http://marvel.com/comics/collection/
                    {fullDetails.data.results[0].issueNumber}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : (
        <p>Data not available</p>
      )}
    </div>
  );

};

export default ComicDetail;
