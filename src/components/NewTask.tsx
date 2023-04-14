import React from 'react'
import { Link } from 'react-router-dom';

type Props = {
    handleClick: React.MouseEventHandler
    task: string
    setTask: any
    desc: string
    setDesc: any
}


function NewTask(props: Props) {

    return (
        <div className="form-control flex flex-col md:flex-row justify-center items-center md:items-end w-screen-lg">


            <div className='w-11/12 md:w-4/12 my-1 md:pr-2'>
                <h2 className='md:text-start mb-1'>Create New Task</h2>
                <input
                    value={props.task}
                    onChange={(e) => props.setTask(e.target.value)}
                    type="text"
                    placeholder="Task name"
                    className="input input-bordered w-full"
                />
            </div>


            <div className='w-11/12 md:w-4/12 my-1 md:pr-2'>
                <input
                    value={props.desc}
                    onChange={(e) => props.setDesc(e.target.value)}
                    type="text"
                    placeholder="Task description"
                    className="input input-bordered w-full"
                />
            </div>


            <button
                className="btn btn-primary w-11/12 md:w-2/12 my-1"
                onClick={props.handleClick}
            >
                Submit
            </button>
        </div>
    )
}

export default NewTask