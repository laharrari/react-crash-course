import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';

function Pokemon() {
    const { id } = useParams();
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const [pokemon, setPokemon] = useState({
        loading: false,
        data: null,
        error: false
    });
    
    let content = null;

    useEffect(() => {
        setPokemon({
            loading: true,
            data: null
        });
        axios.get(url)
            .then(response => {
                setPokemon({
                    loading: false,
                    data: response.data,
                    error: false
                });
            })
            .catch(() => {
                setPokemon({
                    loading: false,
                    data: null,
                    error: true
                });
            });
    }, [url]);

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