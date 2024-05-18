// src/components/SpotPrices.js
import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import axiosInstance from '../utils/axios'; // Import the axiosInstance
import { Puff } from 'react-loader-spinner'; // Import the loader

const SpotPrices = () => {
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axiosInstance.get('/items/spot-prices');
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching spot prices:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchPrices();
  }, []);

  return (
    <Paper style={{ padding: 16, marginBottom: 16 }}>
      <Typography variant="h6">Spot Prices</Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <Puff color="#00BFFF" height={100} width={100} />
        </Box>
      ) : (
        <List>
          {Object.entries(prices).map(([metal, data]) => (
            <ListItem key={metal}>
              <ListItemText
                primary={`${metal}: ${data.price} USD`}
                secondary={`Timestamp: ${data.timestamp}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default SpotPrices;
