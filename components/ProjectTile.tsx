import { Project } from '@/_data/projects';
import "./css/Components.css";

export default function ProjectTile({ title, description, image, link, outsideLink }: Project) {
    return (
        <div className='tile'>
            <a href={link} target={outsideLink ? '_blank' : '_self'}>
                <div className='pic'> <img src={image} className='tile-img' /></div>
                <h1 className='proj-title'>
                    {title}
                </h1>
                <hr className='pad'/>
                <div className='desc pad'>
                    {description}
                </div>
            </a>
        </div>
    );
}