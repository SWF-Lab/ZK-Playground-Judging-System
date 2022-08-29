import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MetaMask } from "../../components/Login";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#121619',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

export function Homepage() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 6,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Homework 0
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            Please read the spec. document carefully before answering the following problems. 
                        </Typography>
                        <Stack
                            sx={{ pt: 0 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <MetaMask />
                        </Stack>
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
}