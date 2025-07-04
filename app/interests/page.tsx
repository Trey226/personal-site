import { Metadata } from "next";
import InterestTile from "@/components/InterestTile";
import "./interests.css";

export const metadata: Metadata = {
    title: "Interests",
    description: "My interests",
};


export default function Interests() {
    return (

        <main>
            <div className="content-area-interests">
                <div className="content-column">
                    <h1 className="column-header">CompSci Stuff</h1>
                    <br />
                    <div className="tile-container">
                        <InterestTile />
                        <InterestTile />
                        <InterestTile />
                    </div>
                </div>
                <div className="content-column">
                    <h1 className="column-header">Econ Stuff</h1>
                    <br />
                    <div className="tile-container">
                        <InterestTile />
                        <InterestTile />
                    </div>
                </div>
                <div className="content-column">
                    <h1 className="column-header">Random Stuff</h1>
                    <br />
                    <div className="tile-container">
                        <InterestTile />
                        <InterestTile />
                        <InterestTile />
                        <InterestTile />
                    </div>
                </div>
            </div>
        </main>
    );
}