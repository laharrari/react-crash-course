import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';
import useAxiosGet from '../Hooks/HttpRequests';

function Pokemon() {
    const { id } = useParams();
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    let pokemon = useAxiosGet(url);
    
    let content = null;

    if (pokemon.error) {
        content = <p>There was an error, refresh or try again later.</p>
    }

    if (pokemon.loading) {
        content = <Loader />;
    }

    if (pokemon.data) {
        content =
        <div>
            <h1 className="capitalize font-bold text-2xl">{pokemon.data.name}</h1>

            <div>
                <img
                    src={pokemon.data.sprites.other['official-artwork'].front_default}
                    alt={pokemon.data.name}
                    className=""
                />
            </div>
            
            <div>
                <ul>
                    <li />Height: {pokemon.data.height}
                    <li />Weight: {pokemon.data.weight}
                </ul>
            </div>
        </div>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default Pokemon;