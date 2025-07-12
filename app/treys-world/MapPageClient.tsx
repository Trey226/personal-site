'use client'

import * as React from "react";
import dynamic from 'next/dynamic';
import { datas, totalDays } from "@/_data/map";
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
                    I have been alive for {totalDays} days, unless something terrible happened (this updates automatically). Here's where I've spent them, and some pictures of my favorite ones.
                    <br /> (For the more technical viewers of this page, no, the pictures aren't lazy loaded. I would hit my free vercel cap way too fast.)
                </p>
                <MapDisplayNoSSR data={datas} />
            </div>
        </main>
    );
}