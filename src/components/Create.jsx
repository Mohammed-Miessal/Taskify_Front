import axios from "axios";
import { React, useState } from 'react';

const Create = () => {
    const createTask = (event) => {
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

        axios.post("http://127.0.0.1:8000/api/task/store", { title: taskName, status: taskStatus, description: taskDescription } , config)
            .then((response) => {
                console.log(response.status);
                window.location.href = "/";
               
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    return (
        <div className="container">
            <form className="flex max-w-md flex-col gap-4" onSubmit={createTask}>
                <input type="text" className="email" placeholder="Title" name='title' />
                <br />
                <input type="text" className="pwd" placeholder="Description" name='description' />
                <select name="status" >
                    <option value="done">Done</option>
                    <option value="to do">To Do</option>
                    <option value="doing">Doing</option>
                </select>
                <button type="submit">
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default Create;
