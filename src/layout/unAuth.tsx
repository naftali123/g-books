import { Container } from "@mui/material"
import { Outlet } from "react-router-dom"

export default function UnAuth(){
    return (
        <Container maxWidth="sm" sx={{ p: 8 }}>
            <Outlet />
        </Container>
    )
}