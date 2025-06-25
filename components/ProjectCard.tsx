import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

type Project = {
    title: string;
    description: string;
    image: string;
    link: string;
    outsideLink: boolean;
}

export default function ActionAreaCard({title, description, image, link, outsideLink}: Project) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea href={link} target={outsideLink ? "_blank" : "_self"}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="A screenshot of the project"
        />
        <CardContent>
            <hr style={{border: "1px solid #e0e0e0"}} />
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
