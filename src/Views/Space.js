import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../Components/Loader';

function Space() {
    const { idx } = useParams();
    const url = "https://epic.gsfc.nasa.gov/api/enhanced/date/2015-10-31";
    const [space, setSpace] = useState({
        loading: false,
        data: null,
        error: false
    });
    
    let content = null;

    useEffect(() => {
        setSpace({
            loading: true,
            data: null
        });
        axios.get(url)
            .then(response => {
                setSpace({
                    loading: false,
                    data: response.data
                });
            })
            .catch(() => {
                setSpace({
                    loading: false,
                    data: null
                });
            });
    }, [url]);

    if (space.loading) {
        content = <Loader />;
    }

    if (space.data && space.data[idx]) {
        let img_url = `https://epic.gsfc.nasa.gov/archive/enhanced/2015/10/31/png/${space.data[idx].image}.png`
        content = 
        <div className="">
            <h1>{space.data[idx].identifier}</h1>
            <div>
                <img
                    src={img_url}
                    alt={space.data[idx].identifier}
                    className="w-1/4"
                />
            </div>
            <div className="font-bold text-xl mb-3">
                {space.data[idx].date}
            </div>
            <div>
                {space.data[idx].caption}
            </div>
        </div>
    } else {
        content =
        <div>
            <p>Error loading the page. Please refresh or try again later.</p>
        </div>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default Space;