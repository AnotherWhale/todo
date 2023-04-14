import React, { useEffect, useState } from 'react';
import { TodoistApi } from '@doist/todoist-api-typescript';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function TodoDetails() {
    const api = new TodoistApi("5c7ceb393340b9d160da405729a5a59fda6e52b8");
    const [projectId, setProjectId] = useState("2308898181");
    const [tasks, setTasks]: any = useState([{}]);
    const { todoID }: any = useParams();
    const [loaded, setLoaded] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        setLoaded(false);
        api.getTasks({
            projectId: projectId,
            ids: [todoID]
        })
            .then((tasks) => {
                setTasks(tasks)
                console.log(tasks)
                setLoaded(true);
            }
            )
            .catch((error) => console.log(error))
    }, [])

    const finishTask = (taskId: string) => {
        setLoaded(false);
        api.closeTask(taskId)
            .then((isSuccess) => {
                setLoaded(true);
                navigate("/");
                console.log(isSuccess);
            })
            .catch((error) => console.log(error))
    }

    return (
        <>{loaded ?
            <div className="hero relative min-w-screen min-h-screen">
                <button onClick={() => history.back()} className='btn absolute top-10 left-10'>Back</button>
                <div className="hero-content text-center">
                    <div className="w-screen">
                        <h1 className="text-5xl font-bold">{tasks["0"].content}</h1>
                        <p className="py-6 mb-10">{tasks["0"].description}</p>
                        <button onClick={() => finishTask(todoID)} className="btn btn-success">Finish Task</button>
                    </div>
                </div>
            </div> :
            <Spinner />}
        </>
    )
}

export default TodoDetails