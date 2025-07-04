import { interestData } from "@/_data/interests";
import InterestTile from "./InterestTile";
import "./Components.css";
import { ReactNode } from "react";

type InterestColumnProp = {
    col: string
}

const data = interestData;

export default function InterestColumn ({ col }: InterestColumnProp){

    const returnElements:ReactNode[] = [];

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        if(element.stuffType === col){
            returnElements.push(<InterestTile key={element.link} linkType={element.linkType} link={element.link} text={element.description} />)
        }
        
    }

    return returnElements;
}