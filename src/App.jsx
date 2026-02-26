import React, { useState } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Handle Create & Update
  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    if (editIndex !== null) {
      const updatedItems = items.map((item, index) =>
        index === editIndex ? inputValue : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, inputValue]);
    }
    setInputValue('');
  };

  // Handle Edit
  const handleEdit = (index) => {
    setInputValue(items[index]);
    setEditIndex(index);
  };

  // Handle Delete
  const handleDelete = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  };

  return (
    <div className="container">
      <h2>React Simple CRUD</h2>
      
      <div className="input-section">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Masukan Data"
        />
        <button onClick={handleSubmit}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {/* Penyesuaian struktur: Tambahkan class name */}
            <span className="item-content">{item}</span>
            <div className="item-actions">
              <button 
                className="edit-btn" 
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <button 
                className="delete-btn" 
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;