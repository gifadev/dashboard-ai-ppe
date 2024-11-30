import React from 'react';
import { Box, Paper, Typography, Chip, Stack } from '@mui/material';
import './InfoPanel.css';

const InfoPanel = () => {
  return (
    <Paper sx={{ bgcolor: '#1a1a1a', color: 'white', p: 2, height: '100%' }}>
      <Stack spacing={3}>
        {/* Show Objects Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Show Objects
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            <Chip label="People" color="primary" />
            <Chip label="Suspicious Item" sx={{ bgcolor: '#ff9800' }} />
            <Chip label="Smoke" />
            <Chip label="Car" />
            <Chip label="Gates" />
          </Stack>
        </Box>

        {/* Accidents Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Accidents
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Crowd</Typography>
              <Typography color="primary">8:46:34</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Bag indoors</Typography>
              <Typography color="primary">21:38:12</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Video Details Section */}
        <Box>
          <Typography variant="h6" gutterBottom>
            Video Details
          </Typography>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Length</Typography>
              <Typography>24:00:00</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Size</Typography>
              <Typography>12.5Mb</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Created</Typography>
              <Typography>20/06/2023</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Camera #</Typography>
              <Typography>128</Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default InfoPanel;
