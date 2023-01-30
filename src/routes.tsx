import { RequireAuth } from "./layout/auth";
import { BooksPageList } from "./features/books";
import { PublicPage } from "./features";
import LoginPage from "./features/login/login";
import { BookDetailesPage } from "./features/books/details";
import { FavoritesBooksPage } from "./features/books/favorites";

export type NavItemPosition = 'top' | 'side' | 'bottom' | 'router'

export interface NavItem {
    path: string;
    label: string;
    positions: NavItemPosition[],
    layout: 'auth' | 'unAuth'
    component?: JSX.Element
}

export const routes: NavItem[] = [
    {
        layout: 'auth',
        label: 'Public Page', 
        path: "/public", 
        positions: ['top', 'side'],
        component: (<PublicPage/>)
    },
    { 
        layout: 'auth',
        label: 'books list', 
        path: "/", 
        positions: ['top', 'side'] ,
        component: (<RequireAuth><BooksPageList /></RequireAuth>)
    },
    { 
        layout: 'auth',
        label: 'book', 
        path: "/book/:volumeId", 
        positions: ["router"],
        component: (<RequireAuth><BookDetailesPage/></RequireAuth>)
    },
    { 
        layout: 'auth',
        label: 'favorites', 
        path: "/favorites", 
        positions: ['top', 'side'] ,
        component: (<RequireAuth><FavoritesBooksPage/></RequireAuth>)
    },
    { 
        layout: 'unAuth',
        label: 'login',
        path: "/login",
        positions: ['router'],
        component: (<LoginPage/>)
    }
];