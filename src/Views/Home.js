import React, { useState, useEffect } from 'react';
import Loader from '../Components/Loader';
import PokemonCard from '../Components/PokemonCard';
import useAxiosGet from '../Hooks/HttpRequests';

function Home() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=15`;

    let pokemons = useAxiosGet(url);

    let content = null;

    if (pokemons.error) {
        content = <p>There was an error, refresh or try again later.</p>
    }

    if (pokemons.loading) {
        content = <Loader />;
    }

    if (pokemons.data) {
        content =
        pokemons.data.results.map((pokemon, key) => 
            <div key={key}>
                <PokemonCard
                    pokemon={pokemon}
                />
            </div>
        )
    }

    return (
        <div>
            <h1 className="font-bold text-2xl">
                Pokédex
            </h1>
            {content}
        </div>
    )
}

export default Home;