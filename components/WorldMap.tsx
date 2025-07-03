'use client'
import * as React from "react";
import WorldMap from "react-svg-worldmap";
import { useState, useEffect } from "react";
import type { CountryContext, Data } from "react-svg-worldmap";
import PicModal from "./PicModal";
import "./Components.css";


type MapDisplayProps = {
    data: Data;
};

function getColor(days: number) {
    if (days > 21)
        return "#004D00";
    if (days > 7)
        return "#4CAF50"
    else
        return "#A2D9A3";
};


const getStyle = ({
    countryValue,
    countryCode,
    minValue,
    maxValue,
    color,
}: CountryContext) => ({
    fill: getColor(countryValue!),
    fillOpacity: countryValue ? 1 : 0,
    stroke: "black",
    strokeWidth: 1,
    strokeOpacity: .3,
    cursor: countryValue ? "pointer" : "auto",
});

export default function MapDisplay({ data }: MapDisplayProps) {

    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        setScreenWidth(window.innerWidth);
    }, []);

    const [modalState, setModalState] = useState({
        isModalOpen: false,
        country: "",
    });

    const handleCloseModal = () => {
        setModalState({
            isModalOpen: false,
            country: "",
        })
    }



    const clickAction = React.useCallback(
        ({ countryName, countryValue }: CountryContext) => {
            if (!countryValue || countryValue <= 0) {
                return;
              }
            setModalState({
                isModalOpen: true,
                country: countryName,
            });
        },
        [],
    );

    return (
        <div className="map-container">
            <WorldMap
                styleFunction={getStyle}
                size={screenWidth < 1200 ? "responsive" : "xxl"}
                data={data}
                valueSuffix="days"
                frame={true}
                onClickFunction={clickAction}
            />

            <PicModal
                isOpen={modalState.isModalOpen}
                name={modalState.country}
                close={handleCloseModal}
            />
        </div>
    );
}