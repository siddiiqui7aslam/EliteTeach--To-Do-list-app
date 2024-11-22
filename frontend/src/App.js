// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
    };

    const addTask = async () => {
        if (task) {
            const response = await axios.post('http://localhost:5000/tasks', { title: task });
            setTasks([...tasks, response.data]);
            setTask('');
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/tasks/${id}`);
        setTasks(tasks.filter((t) => t._id !== id));
    };

    return (
        <div className="app-container">
            <h1 className="app-title">To-Do List</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)} 
                    placeholder="Add a new task"
                    className="task-input"
                />
                <button onClick={addTask} className="add-button">Add a task </button>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id} className="task-item">
                        <span>{task.title}</span>
                        <button onClick={() => deleteTask(task._id)} className="delete-button">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
 