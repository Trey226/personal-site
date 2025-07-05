import { Metadata } from "next";
import InterestColumn from "@/components/InterestColumn";
import "./interests.css";

export const metadata: Metadata = {
    title: "Interests",
    description: "My interests",
};



export default function Interests() {
    return (

        <main>
            <div className="content-area-interests">
                <div className="legend">
                    <img src="./youtube.png" width={45}/>
                    <p>
                       &nbsp; YouTube video &nbsp;
                    </p>
                    <img src="./research.png" width={45}/>
                    <p>
                        &nbsp; Research paper &nbsp;
                    </p>
                    <img src="./web.png" width={45}/>
                    <p className="text-1.5xl">
                        &nbsp; Website
                    </p>

                </div>
                <div className="column-area">
                    <div className="content-column">
                        <h1 className="column-header">CompSci Stuff</h1>
                        <div className="tile-container">
                            <InterestColumn col="compsci" />
                        </div>
                    </div>
                    <div className="content-column">
                        <h1 className="column-header">Econ Stuff</h1>
                        <div className="tile-container">
                        <InterestColumn col="econ" />
                        </div>
                    </div>
                    <div className="content-column">
                        <h1 className="column-header">Random Stuff</h1>
                        <div className="tile-container">
                        <InterestColumn col="random" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}