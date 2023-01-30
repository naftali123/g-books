import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { LSWrapper } from '../utils/ls';

const domain = 'https://www.googleapis.com/books/v1';

export async function FetchVolumes(seerchTerm: string, page: number, full: boolean = false) {
    const maxResults = 10;
    const res = await axios.get(`${domain}/volumes?q=${seerchTerm}&startIndex=${(page - 1) * maxResults}&maxResults=${maxResults}&projection=${full ? 'full' : 'lite'}`);//:keyes&key=${key}
    return res.data;
}

export async function FetchVolume(volumeId: string) {
    const res = await axios.get(`${domain}/volumes?q=${volumeId}`);
    return res.data;
}

export const getFavorites = (): string[] =>
    (LSWrapper.getItem('favorites') as string[]) ?? []

export const setFavorite = (id: string) => {
    const favorites: string[] = getFavorites();
    favorites.push(id);
    LSWrapper.setItem('favorites', favorites);
}

export const removeFavorite = (id: string) => {
    const favorites: string[] = getFavorites();
    favorites.splice(favorites.findIndex(i=>i===id),1)
    LSWrapper.setItem('favorites', favorites);
}

export const checkIsBookFavorite = (id: string): boolean => {
    const favorites: string[] = getFavorites();
    return favorites.includes(id);
}

export type IBook = {
  id: string;
  title: string;
  previewLink: string;
  publishedDate: string;
  publisher: string;
  thumbnail: string;
  favorite: boolean;
}

export type BookStateStatus = 'idle' | 'loading' | 'success' | 'failed';

export interface BooksState {
  books: IBook[];
  totalItems: number;
  searchTerm: string;
  status: BookStateStatus;
}

const initialState: BooksState = {
  books: [],
  totalItems: 1,
  searchTerm: '',
  status: 'idle',
};

export type books = {
  email: string;
  pass: string;
}

export type IFaechVolReq = {
  searchTerm: string, page: number, full?: boolean
}

export const fetchVols = createAsyncThunk(
  'books/fetchVolumes',
  async (req: IFaechVolReq) => {
    const response = await FetchVolumes(req.searchTerm, req.page, req.full ?? false);
    return response;
  }
);
export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setTotalItems(state, action: PayloadAction<number>){
      state.totalItems = action.payload;
    },
    setSearchTerm(state, action: PayloadAction<string>){
      state.searchTerm = action.payload;
    },
    setBooks(state, action: PayloadAction<IBook[]>){
      state.books = action.payload;
    },
    setFromCach(state){
      state.books = LSWrapper.getItem('books');
    },
    setStatus(state, action: PayloadAction<BookStateStatus>){
      state.status = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVols.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVols.fulfilled, (state, action) => {
        state.totalItems = action.payload.totalItems;
        state.books = action.payload.items.map((book: any) => {
          const { volumeInfo, id } = book;
          const { previewLink, publishedDate, publisher, imageLinks, title } = volumeInfo;
          return { 
            previewLink,
            publishedDate,
            publisher,
            thumbnail: imageLinks?.thumbnail ?? "",
            title,
            id,
            favorite: checkIsBookFavorite(id)
          };
        });
        state.status = 'success';
      })
      .addCase(fetchVols.rejected,
        (state) => {
        state.status = 'failed';
      });
  },
});

export const { setBooks, setFromCach, setTotalItems, setSearchTerm, setStatus } = bookSlice.actions;

export const selectBooks = (state: RootState) => state.books.books;

export const selectSeachTerm = (state: RootState) => state.books.searchTerm;

export const selectTotalItems = (state: RootState) => state.books.totalItems;

export const selectStatus = (state: RootState) => state.books.status;

export default bookSlice.reducer;
