import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";



export default function Component() {
    const [tasks, setTasks] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/task/');
                console.log(response.data);

                if (Array.isArray(response.data.tasks)) {
                    setTasks(response.data.tasks);
                } else {
                    console.error('Tasks array not found in API response:', response.data);
                }
            }
            catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const deleteTask = async (event, taskId) => {
        event.preventDefault(); // Prevent default form submission
    
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
    
        axios.delete(`http://127.0.0.1:8000/api/task/destroy/${taskId}`, config)
            .then((response) => {
                console.log(response.status);
                console.log(response.data);
                window.location.href = "/"; 
            })
            .catch((err) => {
                console.error(err.message);
            });
    };
    
    

    return (
        <Fragment>

            <div className="flex justify-center gap-4"  >
                <h1 className=" text-3xl mb-6 font-mono">My tasks :   </h1>
                <div>
                    <Link to="/create" className="bg-green-500 p-2 rounded-lg text-white">Add Task</Link>
                </div>
            </div>

            <div className="flex justify-center flex-wrap flex-row w-11/12 gap-4">
                {tasks.map((task, index) => (
                    <Card key={index} className="w-[384px]">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {task.title}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {task.description}
                        </p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {task.status}
                        </p>

                        <div className="flex gap-4 ">
                            <Link to={`/edit/${task.id}`} className="bg-yellow-400">Edit</Link>
                            <Link to={`/delete/${task.id}`} type="submit" className="bg-red-600" onClick={(event) => deleteTask(event, task.id)}>Delete</Link>

                        </div>

                    </Card>
                ))}
            </div>
        </Fragment>
    );
}
