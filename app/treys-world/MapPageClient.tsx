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
                    I have been alive for [add realtime day calculation here] days. this is where I have spent them and some of my favorite pictures.
                </p>
                <MapDisplayNoSSR data={datas} />
            </div>
        </main>
    );
}