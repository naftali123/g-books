import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchVolume, IBook } from "./booksSlice";

function Book({ title, publishedDate, publisher, thumbnail }: IBook) {
    return (
        <Card>
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
                <Typography variant="body2" color="text.secondary">
                    {publishedDate}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {publisher}
                </Typography>
            </CardContent>
        </Card>
    );
}


export function BookDetailesPage(){
    let { volumeId } = useParams();
    const [book, setBook] = useState<IBook | null>(null);

    useEffect(()=>{
        if(book === null && volumeId){
            FetchVolume(volumeId).then(({items}) => {
                const { volumeInfo, id } = items[0];
                const { previewLink, publishedDate, publisher, imageLinks, title } = volumeInfo;
                setBook({ id, previewLink, publishedDate, publisher, thumbnail: imageLinks.thumbnail, title, favorite: false });
            });
        }
    }, [volumeId, book]);

    return (
        <Grid container>
            <Grid item xs={12} m={4}>
            { volumeId
                ? book === null
                    ? (<>Loading...</>)
                    : (<Book {...book}/>)
                : (<>Not found</>)}
            </Grid>
        </Grid>
    )
}