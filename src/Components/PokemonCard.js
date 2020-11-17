import React from 'react';
import {Link} from 'react-router-dom';

function PokemonCard(props) {
    return (
        <div className="mb-4 rounded overflow-hidden capitalize bg-blue-500 py-3 block text-white text-center">
            <Link to={`/pokemon/${props.pokemon.name}`}>
                {props.pokemon.name}
            </Link>
        </div>
    )
}

export default PokemonCard;