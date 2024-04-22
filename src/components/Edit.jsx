import axios from "axios";
import { React, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Create = () => {

    const { id } = useParams();
    const [task, setTask] = useState([]);

    const getTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/task/show/' + id);
            setTask(response.data.task);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);


    const updateTask = (event) => {
        event.preventDefault(); // Prevent default form submission

        const taskName = event.target.title.value;
        const taskStatus = event.target.status.value;
        const taskDescription = event.target.description.value;

        const token = localStorage.getItem("token");
        if (!token) {
            console.log("No Token Found");
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        axios.put(`http://127.0.0.1:8000/api/task/update/${id}`, { title: taskName, status: taskStatus, description: taskDescription }, config)
            .then((response) => {
                console.log(response.status);
                window.location.href = "/";

            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    const handleChange = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    }

    return (
        <div className="container">
            <form className="flex max-w-md flex-col gap-4" onSubmit={updateTask}>
                <input type="text" className="email" placeholder="Title" name='title' onChange={handleChange} value={task.title} />
                <br />
                <input type="text" className="pwd" placeholder="Description" onChange={handleChange} name='description' value={task.description} />
                <select name="status" value={task.status} onChange={handleChange} >
                    <option value="done">Done</option>
                    <option value="to do">To Do</option>
                    <option value="doing">Doing</option>
                </select>
                <button type="submit">
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default Create;
