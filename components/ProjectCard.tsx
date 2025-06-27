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
    <Card
      variant="outlined"
      sx={{
        width: 345,
        height: 360,
        borderRadius: "50px",
        // A slightly larger, softer initial shadow
        boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        // Styles for when the card is hovered over
        "&:hover": {
          transform: "scale(1.03)",
          // A more noticeable, "lifted" shadow on hover
          boxShadow: "0 10px 30px 0 rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <CardActionArea
        href={link}
        target={outsideLink ? "_blank" : "_self"}
        className="h-full"
        // Added borderRadius to make the ripple effect match the card's shape
        sx={{ borderRadius: "50px" }}
      >
        <CardMedia
          component="img"
          height="170px"
          image={image}
          alt="A screenshot of the project"
        />
        <CardContent>
          <hr style={{ border: "1px solid #e0e0e0" }}/>
          <Typography gutterBottom variant="h5" component="div" className='flex justify-center'>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} className='flex justify-center align-bottom pb-1'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
