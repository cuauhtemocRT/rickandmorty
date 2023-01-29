import React from 'react';

const LocationInfo = ({ location }) => {
    return (
        <article>
            <h2 className="app__title">{location?.name}</h2>
            <ul className="app__list">
                <li className="app__item"><span>Type: </span>{location?.type}</li>
                <li className="app__item"><span>Dimension: </span>{location?.dimension}</li>
                <li className="app__item"><span>Population: </span>{location?.residents.length}</li>
            </ul>
        </article>
    );
};

export default LocationInfo;