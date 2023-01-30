import { IconButton, Card, CardMedia, CardContent, Typography, CardActions, Grid, Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { IBook, removeFavorite, setFavorite } from "./booksSlice";


export function FavoriteButton({ id, favorite }: IBook) {
    const [f, setF] = useState<boolean>(favorite);

    const handleChangeFave = useCallback(()=> {
        setF(!f);
        if(f) removeFavorite(id)
        else setFavorite(id);
    }, [f, setF, id]);

    return (
        <IconButton onClick={handleChangeFave}>
            { f ? <FavoriteIcon/> : <FavoriteBorderIcon/> }
        </IconButton>
    );
}

export function BookCard(book: IBook) {
    const { title, previewLink, id, thumbnail } = book;
    return (
        <Card sx={{ maxWidth: 345 }} style={{
            display: 'block',
            transitionDuration: '0.3s',
            height: '45vw'
        }}>
            <CardMedia
                component="img"
                alt={title}
                height="140"
                image={thumbnail}
            />
            <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                    {title}
                </Typography>
            </CardContent>
            <CardActions>
                <Grid container>
                    <Grid item xs={12}>
                        <Button size="small" href={previewLink}>Preview</Button>
                        <Link to={`/book/${id}`}>Show More</Link>
                        {/* <Button size="small" href={previewLink}>
                        </Button> */}
                    </Grid>
                    <Grid>
                        <FavoriteButton {...book}/>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
