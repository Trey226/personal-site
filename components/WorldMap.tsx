'use client'
import * as React from "react";
import WorldMap from "react-svg-worldmap";
import { data } from '@/_data/map';
import "./css/Components.css";


type MapDisplayProps = {
  data: data[];
};

export default function MapDisplay({ data }: MapDisplayProps) {

    
    return (
            <div className="map-container">
                <WorldMap
                    color="blue"
                    value-suffix="people"
                    size="xxl"
                    data={data}
                    valueSuffix="days"
                    frame={true}
                    strokeOpacity={.3}
                />
            </div>
    );
}