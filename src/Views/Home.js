import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Components/Loader';
import PokemonCard from '../Components/PokemonCard';

function Home() {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=15`;
    const [pokemons, setPokemons] = useState({
        loading: false,
        data: null,
        error: false
    });

    let content = null;

    useEffect(() => {
        setPokemons({
            loading: true,
            data: null
        });
        axios.get(url)
            .then(response => {
                setPokemons({
                    loading: false,
                    data: response.data,
                    error: false
                });
            })
            .catch(() => {
                setPokemons({
                    loading: false,
                    data: null,
                    error: true
                });
            });
    }, [url]);

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