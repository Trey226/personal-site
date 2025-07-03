'use client'
import * as React from "react";
import WorldMap from "react-svg-worldmap";
import { data } from '@/_data/map';
import { useState, useEffect } from "react";
import "./css/Components.css";


type MapDisplayProps = {
  data: data[];
};


export default function MapDisplay({ data }: MapDisplayProps) {

    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);
    
    return (
            <div className="map-container">
                <WorldMap
                    color="blue"
                    value-suffix="people"
                    size={screenWidth < 1200 ? "responsive": "xxl"}
                    data={data}
                    valueSuffix="days"
                    frame={true}
                    strokeOpacity={.3}
                />
            </div>
    );
}