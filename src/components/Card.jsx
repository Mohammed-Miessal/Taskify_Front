import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Card } from "flowbite-react";
import { Button } from "flowbite-react";
import { Fragment } from "react";

export default function Component() {
    const [tasks, setTasks] = useState([]);

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

    return (
        <Fragment>
              
            <div className="flex justify-center gap-4"  >
                <h1 className=" text-3xl mb-6 font-mono">My tasks :   </h1>
               <div>
               <Button type="submit" className="bg-blue-400 "> Add TAsk </Button>
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
                            <Button type="submit" className="bg-yellow-400  " >Edit </Button>
                            <Button type="submit" className="bg-red-600  ">Delete</Button>
                            <Button type="submit" className="bg-green-600  ">Done !!</Button>
                        </div>


                    </Card>
                ))}
            </div>
        </Fragment>
    );
}
