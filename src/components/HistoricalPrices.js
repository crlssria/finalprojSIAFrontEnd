// src/components/HistoricalPrices.js
import React, { useState, useEffect, useRef } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Puff } from 'react-loader-spinner'; // Import the loader
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

// Register required components with ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const HistoricalPrices = () => {
  const [metal, setMetal] = useState('XAU');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [prices, setPrices] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const chartRef = useRef(null);

  const fetchHistoricalPrices = async () => {
    setLoading(true); // Set loading to true when starting to fetch data
    try {
      const response = await axios.get('http://127.0.0.1:8000/items/historical-prices', {
        params: { metal, start_date: startDate, end_date: endDate },
      });
      if (response.data.error) {
        setError(response.data.error);
        setPrices([]);
      } else {
        setError('');
        setPrices(response.data);
      }
    } catch (error) {
      setError('Failed to fetch historical prices. Please check the parameters and try again.');
      setPrices([]);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const data = {
    labels: prices.map((price) => new Date(price.date)),
    datasets: [
      {
        label: `${metal} Price`,
        data: prices.map((price) => price.price),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  }, [data]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Historical Prices
      </Typography>
      <TextField
        label="Metal"
        select
        value={metal}
        onChange={(e) => setMetal(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="XAU">Gold (XAU)</MenuItem>
        <MenuItem value="XAG">Silver (XAG)</MenuItem>
        <MenuItem value="XPT">Platinum (XPT)</MenuItem>
        <MenuItem value="XPD">Palladium (XPD)</MenuItem>
      </TextField>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={fetchHistoricalPrices} fullWidth>
        Get Prices
      </Button>
      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Puff color="#00BFFF" height={100} width={100} />
        </Box>
      )}
      {!loading && error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      {!loading && !error && prices.length > 0 && (
        <Box mt={4}>
          <Line ref={chartRef} data={data} />
        </Box>
      )}
    </Container>
  );
};

export default HistoricalPrices;
