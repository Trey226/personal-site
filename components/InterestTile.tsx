import type { Interest } from "@/_data/interests";
import "./Components.css";

type InterestTileProps = {
    link: string,
    linkType: string,
    text: string,
}

export default function InterestTile({linkType, link, text}: InterestTileProps) {

    let iconPath = `./${linkType}.png`

    return (
        <a href={link} className="interest-tile" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center">
                <div className="interest-tile-icon">
                    <img src={iconPath} width={35} />
                </div>
                <p className="interest-tile-text">
                    {text}
                </p>
            </div>
        </a>
    );
}