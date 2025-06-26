"use client";

/**
 * AboutMe.tsx
 * 
 * This component renders the "About Me" section of the portfolio.
 * It is designed as a "Client Island" to handle responsive layout adjustments,
 * preventing SSR hydration errors while maintaining optimal server performance for the rest of the page.
 * It uses Material-UI for styling and layout, using Stack for a robust responsive implementation.
 */

import React from 'react';
import { Container, Stack, Avatar, Typography, IconButton, Box, SvgIcon } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';


export default function AboutMe() {
    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 4, sm: 4 }}
                alignItems="center"
                justifyContent="center"
            >
                {/* Profile Picture and Social Icons */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: { xs: '100%', sm: 'auto' },
                    }}
                >
                    {/* Profile Picture using next/image */}
                    <Box
                        sx={{
                            width: { xs: 240, sm: 240 },
                            height: { xs: 240, sm: 240 },
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '3px solid #fff',
                            boxShadow: 2,
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            src="/pfp.jpg"
                            alt="Trey Gilliam profile picture"
                            width={240}
                            height={240}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            priority
                        />
                    </Box>
                    {/* Social Media Links */}
                    <Stack direction="row" spacing={2} sx={{ mb: { xs: 2, sm: 0 } }}>
                        {/* GitHub IconButton: Links to GitHub profile */}
                        <IconButton
                            aria-label="GitHub"
                            href="https://github.com/Trey226"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            size="large"
                        >
                            <GitHubIcon sx={{ fontSize: 60 }} />
                        </IconButton>
                        {/* LinkedIn IconButton: Links to LinkedIn profile */}
                        <IconButton
                            aria-label="LinkedIn"
                            href="https://linkedin.com/in/Trey226"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            size="large"
                        >
                            <LinkedInIcon sx={{ fontSize: 60 }} />
                        </IconButton>
                        {/* Discord IconButton: Links to Discord */}
                        <IconButton
                            aria-label="Discord"
                            href="https://discord.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            size="large"
                        >
                            <img src="/Discord.svg" alt="Discord" width={60} height={60} />
                        </IconButton>
                    </Stack>
                </Box>
                {/* Bio Section */}
                <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, flex: 1 }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Trey Gilliam
                    </Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. 
                        In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla 
                        lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel 
                        class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                        <br />

                        Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. 
                        In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla 
                        lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel 
                        class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                    </Typography>
                </Box>
            </Stack>
        </Container>
    );
}