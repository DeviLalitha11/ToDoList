import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://todolist-5bna.onrender.com/data");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data');
    }
  };

  const addOrEditData = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`https://todolist-5bna.onrender.com/edit/${editId}`, { name });
        setEditId(null);
      } else {
        await axios.post("https://todolist-5bna.onrender.com/text", { name });
      }
      setName("");
      fetchData();
    } catch (error) {
      console.error('Error adding/editing data:', error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`https://todolist-5bna.onrender.com/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const startEdit = (item) => {
    setName(item.name);
    setEditId(item._id);
  };

  return (
    <div className='container'>
      <h1>To Do List</h1>
      <form onSubmit={addOrEditData}>
        <input
          type='text'
          placeholder='Enter your task'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <button className='add' type='submit'>{editId ? "Update" : "Add"}</button>
      </form>

      <ol>
  {data.map((item) => (
    <li key={item._id}>
      <span>{item.name}</span>
      <div className="icons">
        <button className='icon-btn edit' onClick={() => startEdit(item)} title="Edit">
          <i className="fas fa-pen"></i>
        </button>
        <button className='icon-btn delete' onClick={() => deleteData(item._id)} title="Delete">
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </li>
  ))}
</ol>

    </div>
  );
};

export default App;
