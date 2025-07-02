import { Project } from '@/_data/projects';
import "./css/Components.css";

export default function ProjectTile({ title, description, image, link, outsideLink }: Project) {
    return (
            <a href={link} target={outsideLink ? '_blank' : '_self'} className='tile'>
                <div className='pic'> <img src={image} className='tile-img' /></div>
                <h1 className='proj-title'>
                    {title}
                </h1>
                <hr className='pad'/>
                <div className='desc pad'>
                    {description}
                </div>
            </a>
    );
}