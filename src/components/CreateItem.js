// src/components/CreateItem.js
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';

const CreateItem = () => {
  const [itemName, setItemName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/items/', { name: itemName });
      setItemName('');
      alert('Item created successfully');
    } catch (error) {
      console.error('Error creating item:', error);
      alert('Failed to create item');
    }
  };

  return (
    <Paper style={{ padding: 16, marginBottom: 16 }}>
      <Typography variant="h6">Order Metal</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Metal Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </Paper>
  );
};

export default CreateItem;
