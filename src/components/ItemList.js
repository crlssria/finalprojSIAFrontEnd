// src/components/ItemList.js
import React, { useState, useEffect } from 'react';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/items/');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Paper style={{ padding: 16, marginBottom: 16 }}>
      <Typography variant="h6">Ordered Metals</Typography>
      <List>
        {items.map((item) => (
          <ListItem key={item._id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ItemList;
