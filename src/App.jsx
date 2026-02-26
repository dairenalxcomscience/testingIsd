import React, { useState, useEffect } from 'react';
import './App.css';


// Masukkan URL Web App dari Google Apps Script Anda di sini
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwNRGiCCYa2o6HTaHlBfgU6eByZAZmbzx13D_0LpcQxHRGVtv4aHdTceWtkq6EssxkK/exec";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Opsional: untuk indikator loading

  // 1. READ: Ambil data dari Spreadsheet
  const fetchItems = () => {
    fetch(SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        // Mengubah array dari [[id, text]] menjadi [{id, text}]
        const formatted = data.map(row => ({ id: row.id, text: row.text }));
        setItems(formatted);
      })
      .catch(err => console.error("Error fetching data:", err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 2. CREATE: Tambah data ke Spreadsheet
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Sangat penting agar tidak diblokir CORS
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ action: "add", text: inputValue })
      });

      setInputValue('');
      // Delay fetch ulang karena Google Sheets butuh waktu untuk menulis
      setTimeout(() => {
        fetchItems();
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      setIsLoading(false);
    }
  };

  // 3. DELETE: Hapus data dari Spreadsheet
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({ action: "delete", id: id })
      });

      setTimeout(() => fetchItems(), 1500);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="container">
      <h2>React + Spreadsheet CRUD</h2>
      
      <form className="input-section" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isLoading ? "Sedang mengirim..." : "Simpan ke Google Sheets..."}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Wait...' : 'Add'}
        </button>
      </form>

      <ul>
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id}>
              <span className="item-content">{item.text}</span>
              <div className="item-actions">
                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p style={{textAlign: 'center', color: '#94a3b8'}}>Belum ada data atau sedang memuat...</p>
        )}
      </ul>
    </div>
  );
}

export default App;