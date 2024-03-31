import React from "react";

const Card = ( { data, description} ) => {

    return (
        <div className="bg-gray-800 text-white rounded-lg p-10 flex flex-col justify-center">
            <h1 className="text-4xl">{data}</h1>
            <p>{description}</p>
        </div>
    )
    

}

export default Card;
