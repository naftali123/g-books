import { Grid, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { IBook, selectBooks, selectStatus } from "./booksSlice";
import { BookCard } from "./components";

export function FavoritesBooksPage() {
    const books: IBook[] = useAppSelector(selectBooks);
    const status = useAppSelector(selectStatus);

    return (
        <Grid container sx={{ mt: 3 }}>
            <Grid item xs={12}>
                <Typography >
                    Favorites
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {
                        status === 'idle' 
                        ? <></>
                        : status === 'loading' 
                            ? <>Loading</>
                            : books.length && books.filter((book)=>book.favorite).map((book) => (
                                <Grid item xs={4} m={2} key={book.id}>
                                    <BookCard
                                        {...book}
                                    />
                                </Grid>))
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}