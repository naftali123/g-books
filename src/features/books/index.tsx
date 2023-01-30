import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { fetchVols, IBook, selectBooks, selectSeachTerm, selectStatus, selectTotalItems, setSearchTerm, setStatus } from './booksSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BookCard } from './components';

export function BooksPageList() {
    const dispatch = useAppDispatch();
    const books: IBook[] = useAppSelector(selectBooks);
    const searchTerm: string = useAppSelector(selectSeachTerm);
    const totalItems: number = useAppSelector(selectTotalItems);
    const status = useAppSelector(selectStatus);

    const handleFech = (page: number = 1) => {
        dispatch(setStatus('loading'));
        dispatch(fetchVols({ searchTerm, page }));
    }

    const handleKeyDown = (event: any) => event.key === 'Enter' && handleFech();
    console.log({status});
    
    return (
        <Grid container sx={{ mt: 3 }}>
            <Grid item xs={12}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(t) => {
                            dispatch(setSearchTerm(t.currentTarget.value));
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton 
                        type="button" 
                        sx={{ p: '10px' }} 
                        aria-label="search" 
                        onClick={()=>handleFech()}
                    >
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    {
                        status === 'idle' 
                        ? <></>
                        : status === 'loading' 
                            ? <>Loading</>
                            : books.length && books.map((book) => (
                                <Grid item xs={4} m={2} key={book.id}>
                                    <BookCard
                                        {...book}
                                    />
                                </Grid>))
                    }
                </Grid>
                <Grid item xs={12}>

                    { 
                        status === 'idle' 
                        ? <></>
                        : status === 'loading' 
                            ? <></>
                            : books.length && (
                            <Stack spacing={2}>
                                <Pagination 
                                    count={totalItems} 
                                    onChange={(e, value)=>handleFech(value)}
                                />
                            </Stack>
                        ) 
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

