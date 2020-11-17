import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Space() {
    const { idx } = useParams();
    const url = "https://epic.gsfc.nasa.gov/api/enhanced/date/2015-10-31";
    const [space, setSpace] = useState(null);
    
    let content = null;

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setSpace(response.data);
            });
    }, [url]);

    if (space && space[idx]) {
        let img_url = `https://epic.gsfc.nasa.gov/archive/enhanced/2015/10/31/png/${space[idx].image}.png`
        content = 
        <div>
            <h1>{space[idx].identifier}</h1>
            <div>
                <img
                    src={img_url}
                    alt={space[idx].identifier}
                    className="w-1/2"
                />
            </div>
            <div className="font-bold text-xl mb-3">
                {space[idx].date}
            </div>
            <div>
                {space[idx].caption}
            </div>
        </div>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default Space;