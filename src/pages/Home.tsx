import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Todos from "../components/Todos";
import NewTask from "../components/NewTask";
import { TodoistApi } from "@doist/todoist-api-typescript";
import Spinner from "../components/Spinner";

function Home() {
  //   const api = new TodoistApi("5c7ceb393340b9d160da405729a5a59fda6e52b8");
  const [tasks, setTasks] = useState([{}]);
  const [newTask, setNewTask] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loadDataCalled, setLoadDataCalled] = useState(false);
  const [api, setApi] = useState<TodoistApi>(() => {
    const apiKey = localStorage.getItem("api");

    if (typeof apiKey === "string") {
      return new TodoistApi(apiKey);
    } else {
      // handle the case where the API key is not found or is not a string
      return new TodoistApi("");
    }
  });

  const [apiKey, setApiKey] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const setData = (API: string) => localStorage.setItem("api", API);

  const handleSubmit = () => {
    setData(apiKey);
    setApi(new TodoistApi(apiKey));
  };

  const [error, setError] = useState("");

  const loadData = () => {
    api
      .getTasks({
        // projectId: projectId,
      })
      .then((tasks) => {
        setTasks(tasks);
        console.log(tasks);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Load Data: ", error);
        setError("Please enter a valid API Key");
        setData("");
        setApi(new TodoistApi(""));

        // Remove error after 3 seconds
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  useEffect(() => {
    if (loadDataCalled || localStorage.getItem("api") !== "") {
      setLoaded(false);
      loadData();
    } else {
      setLoadDataCalled(true);
    }
  }, [api.authToken]);

  const addTask = (name: string, description: string) => {
    setLoaded(false);
    setNewTask("");
    setNewDesc("");
    api
      .addTask({
        // projectId: projectId,
        content: name,
        description: description,
      })
      .then((task) => {
        getTasks();
        console.log(task);
      })
      .catch((error) => {
        console.log("Add Task: ", error);
        setLoaded(true);
      });
    console.log("hello");
  };

  const finishTask = (taskId: string) => {
    setLoaded(false);
    api
      .closeTask(taskId)
      .then((isSuccess) => {
        getTasks();
        console.log(isSuccess);
      })
      .catch((error) => console.log("Finish Task: ", error));
  };

  const getTasks = () => {
    api
      .getTasks({
        // projectId: projectId,
      })
      .then((tasks) => {
        setTasks(tasks);
        console.log(tasks);
        setLoaded(true);
      })
      .catch((error) => console.log("Get Tasks: ", error));
  };

  return (
    <>
      <h1 className="font-bold mx-3">todo list maker</h1>
      <h2 className="mb-5 mx-3">
        {" "}
        a simple todo list using todoist api, made by{" "}
        <a target="_blank" href="https://github.com/AnotherWhale">
          Mustafa Turner
        </a>
      </h2>
      {error && (
        <div className="alert alert-info shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current flex-shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      {api.authToken === "" ? (
        <div className="mx-3 my-10">
          <h2 className="text-start">Please enter your todoist API key</h2>
          <div className="flex items-center gap-2">
            <input
              className="py-4 input input-bordered w-full"
              value={apiKey}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit} className="btn">
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            {loaded ? (
              tasks.length > 0 ? (
                <Todos>
                  {tasks.map((task: any) => {
                    return (
                      <tr key={task.id}>
                        <td>
                          <h2 className="font-bold whitespace-normal">
                            {task.content}
                          </h2>
                          <p className="font-light whitespace-normal">
                            {task.description}
                          </p>
                        </td>

                        <td>
                          <button
                            className="btn btn-success mr-2"
                            onClick={() => finishTask(task.id)}
                          >
                            ✓
                          </button>
                          <Link
                            to={`/details/${task.id}`}
                            className="btn btn-outline"
                          >
                            ...
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </Todos>
              ) : (
                <div className="card w-11/12 max-w-screen-lg md:w-10/12 bg-neutral text-neutral-content my-10">
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">You have no tasks</h2>
                    <p>Create a new task using the textbox below</p>
                  </div>
                </div>
              )
            ) : (
              <Spinner />
            )}
          </div>
          <NewTask
            handleClick={() => addTask(newTask, newDesc)}
            task={newTask}
            setTask={setNewTask}
            desc={newDesc}
            setDesc={setNewDesc}
          />
        </>
      )}
    </>
  );
}

export default Home;
