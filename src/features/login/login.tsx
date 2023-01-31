import { useNavigate, useLocation } from "react-router-dom";
import { Container, Grid, Paper, Button, Typography, Stack, FormControl, TextField, Avatar } from '@mui/material';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser, setFromCach, setUser, User } from "./loginSlice";
import { useEffect, useRef } from "react";

function Title({ email }: { email?: string }) {
    return (
        <Typography variant='h6' textAlign={'center'}>
            Login {email ?? ''}
        </Typography>
    );
}

function PasswordInput() {
    return <Grid mt={1}>
        <FormControl fullWidth>
            <TextField
                type="password"
                label='Password'
                size='small'
                name='pass'
                id="pass"
                aria-describedby="my-helper-text"
            // value={pass}
            />
        </FormControl>
    </Grid>;
}

function EmailInput() {
    return <Grid mt={0}>
        <FormControl fullWidth>
            <TextField
                label='Email'
                size='small'
                name='email'
                id='email'
                type='email'
                aria-describedby='my-helper-text'
            // value={email}
            />
        </FormControl>
    </Grid>;
}

export default function LoginPage() {
    const cachChecked = useRef<boolean>(false);
    const user: User = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let email = formData.get("email") as string;
        let pass = formData.get("pass") as string;
        dispatch(setUser({ email, pass }));
        navigate(from, { replace: true });
    }

    useEffect(()=>{
        if(user!=null && (user.email === '' || user.pass === '')){
            if(!cachChecked.current){
                dispatch(setFromCach());
                cachChecked.current = true;
            }
        }
        else navigate(from, { replace: true });
    }, [user, dispatch, from, navigate]);

    return (
        <Container maxWidth="xs">
            <Grid mt={12}>
                <Paper variant='outlined'>
                    <Grid container p={4}>
                        <Grid item xs={12}>
                            <Stack direction="row" justifyContent={'center'} mb={2}>
                                <Avatar>L</Avatar>
                            </Stack>
                            <Title />
                        </Grid>
                        <Grid item xs={12} mt={4}>
                            <form onSubmit={handleSubmit}>
                                <EmailInput />
                                <PasswordInput />
                                <Grid mt={1}>
                                    <Stack direction="row" justifyContent={'center'}>
                                        <Button
                                            type='submit'
                                            variant="outlined"
                                            fullWidth
                                        >
                                            Next
                                        </Button>
                                    </Stack>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    );
}

