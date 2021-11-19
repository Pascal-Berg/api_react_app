import * as React from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import Button from '@mui/material/Button';
import { AppBar, Box, Toolbar, Typography, useTheme } from '@mui/material';

export default function App() {
    const theme = useTheme();
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.grey['100'],
                minHeight: '100vh',
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Questions and Answers
                        </Typography>
                        <Button color={'inherit'} component={RouterLink} to="/">
                            Home
                        </Button>
                        <Button
                            color={'inherit'}
                            component={RouterLink}
                            to="/login"
                        >
                            Login
                        </Button>
                        <Button
                            color={'inherit'}
                            component={RouterLink}
                            to="/register"
                        >
                            Register
                        </Button>
                        <Button
                            color={'inherit'}
                            component={RouterLink}
                            to="/questions"
                        >
                            Questions
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Outlet />
        </Box>
    );
}
