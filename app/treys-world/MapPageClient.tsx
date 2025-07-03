'use client'

import * as React from "react";
import dynamic from 'next/dynamic';
import { datas } from "@/_data/map";
import "./map.css"


const MapDisplayNoSSR = dynamic(
    () => import('../../components/WorldMap'),
    { 
      ssr: false ,
      loading: () => <div style={{ height: '500px' }} />
    }
  );

export default function MapPageClient() {
    return (
        <main>
            <div className="content-area-map">
                <h1 className="map-title">Around The World with Trey</h1>
                <br />
                <p className="general-text-map">
                    This map highlights all of the countries that I have been to. When you hover over each country it will tell you the number of days that I have spent in that country.
                    When you click on *most* of the countries it will pop up my favorite pictures I have taken there.
                </p>
                <MapDisplayNoSSR data={datas} />
            </div>
        </main>
    );
}