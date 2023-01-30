import {
    Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { AccountCircle } from "@mui/icons-material";
import { Container } from "@mui/material";
import { routes, NavItem } from "../routes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { reset, selectEmail, selectPass, selectUser } from "../features/login/loginSlice";
import React from "react";

export function RequireAuth({ children }: { children: JSX.Element }) {
    const email = useAppSelector(selectEmail);
    const pass = useAppSelector(selectPass);
    let location = useLocation();
    return (email==='' || pass==='')
        ? <Navigate to="/login" state={{ from: location }} replace />
        : children;
}

export function AuthStatus() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    let navigate = useNavigate();

    let signout = () => {
        dispatch(reset());
        navigate('/login', { replace: true });
    };
    
    return (
        <IconButton
            size="large"
            aria-label="Sign out"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={user
                ? () => signout()
                : () => navigate("/login")
            }
        >
            {user ? <LogoutIcon /> : <AccountCircle />}
        </IconButton>
    );
}

const drawerWidth = 240;

export function Auth(props: any) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {routes
                    .filter(({ positions }: NavItem) => positions.includes('side'))
                    .map((item: NavItem) => (
                        <ListItem key={crypto.randomUUID()} disablePadding>
                            <Link to={item.path} style={{ "textDecoration": "none" }}>
                                <ListItemButton sx={{ textAlign: 'center' }}>
                                    <ListItemText primary={item.label} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        L
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {routes
                            .filter(({ positions }: NavItem) => positions.includes('top'))
                            .map((item: NavItem) => (
                            <Link key={crypto.randomUUID()} to={item.path} style={{ "textDecoration": "none" }}>
                                <Button sx={{ color: '#fff' }}>
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <AuthStatus />
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Container maxWidth="sm" sx={{ p: 8 }}>
                <Outlet />
            </Container>
        </Box>
    );
}

export default Auth;
