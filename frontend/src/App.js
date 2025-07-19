import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/data");
      console.log(response);
      setData(response.data);
    }catch(error){
      console.error('Error fetching data');
    }
  }

  const addData = async (e) => {
    e.preventDefault();
    try{
      await axios.post("http://localhost:3000/text", {name});
      setName("");
      fetchData();
    } catch(error) {
      console.error('Error adding data:', error)
    }
  };

  const deleteData = async(id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      fetchData();
    } catch(error) {
      console.error('Error deleting data:', error);
    }
  }

  return (
    <div className='container'>
      <h1>To Do List</h1>
      <form onSubmit={addData}>
        <label>Task:</label>
        <input
        type='text'
        placeholder='Enter your task'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        required>
        </input>
        <br></br>
        <button type='submit'>Add</button>
      </form>
      <ol>
        {data.map((item, index) => (
          <li key={index}>
            {item.name}
            <button onClick={()=>deleteData(item._id)}>Delete</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default App;
