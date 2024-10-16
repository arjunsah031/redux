import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemDeletionAppWithAPI = () => {
  const [items, setItems] = useState([]);           // Store fetched data
  const [selectedItems, setSelectedItems] = useState([]); // Track selected items for deletion
  const [selectAll, setSelectAll] = useState(false); // Select All state

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users'); // Fetching data from API
        setItems(response.data); // Set the fetched data to items state
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  // Handle "Select All" checkbox toggle
  const handleSelectAll = () => {
    if (!selectAll) {
      // Select all items if Select All is checked
      setSelectedItems(items.map(item => item.id));
    } else {
      // Unselect all items if Select All is unchecked
      setSelectedItems([]);
    }
    setSelectAll(!selectAll);
  };

  // Handle individual item selection
  const handleItemSelect = (id) => {
    if (selectedItems.includes(id)) {
      // If already selected, remove from selection
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      // Otherwise, add to selection
      setSelectedItems([...selectedItems, id]);
    }

    // If all items are selected manually, set "Select All" as true
    if (selectedItems.length + 1 === items.length && !selectedItems.includes(id)) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  // Handle deletion of items (single item or multiple selected items)
  const handleDelete = (id) => {
    if (selectAll || selectedItems.length > 1) {
      // If "Select All" or more than one item is selected, delete all selected items
      setItems(items.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
      setSelectAll(false); // Reset Select All state
    } else if (id) {
      // If one item is selected, delete that item
      setItems(items.filter(item => item.id !== id));
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  return (
    <div>
      <h2>Item Deletion with API Data</h2>

      {/* Select All Checkbox */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          Select All
        </label>
      </div>

      {/* List of items fetched from the API */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleItemSelect(item.id)}
            />
            {item.name} {/* Name of the user */}

            {/* Conditionally render individual Delete button only if one item is selected */}
            {selectedItems.length <= 1 && selectedItems.includes(item.id) && (
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>

      {/* Conditionally render Delete All button if more than one item is selected */}
      {selectedItems.length > 1 && (
        <button onClick={() => handleDelete(null)}>
          Delete All Selected
        </button>
      )}
    </div>
  );
};

export default ItemDeletionAppWithAPI;
