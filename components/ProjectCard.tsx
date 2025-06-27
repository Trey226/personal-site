import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Project } from '@/_data/projects';

export default function ActionAreaCard({title, description, image, link, outsideLink}: Project) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 345,
        height: 360,
        borderRadius: "69px",
        transition: "transform .15s ease-in-out",
        // Styles for when the card is hovered over
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <CardActionArea
        href={link}
        target={outsideLink ? "_blank" : "_self"}
        className="h-full"
      >
        <CardMedia
          className='h-1/2 w-2/3'
          component="img"
          image={image}
          alt="A screenshot of the project"
        />
        <CardContent>
          <hr style={{ border: "1px solid #e0e0e0" }}/>
          <Typography gutterBottom variant="h5" component="div" className='flex justify-center'>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} className='h-full flex justify-center content-end'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
