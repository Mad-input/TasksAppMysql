import { useEffect, useRef, useState } from 'react';
import useFetch from '../hook/useFetch.js';
import FooterBoard from './FooterBoard.jsx';
import ListTasks from './ListTasks.jsx';
import FormBoard from './FormBoard.jsx';

const {VITE_API_URL: APIURL = 'http://localhost:3000'} = import.meta.env



function Board({currentBoard}) {
    const {data: {result}, loading, error} = useFetch(`${APIURL}/board/${currentBoard}`, 'get')
    const [FormOptions, setFormOptions] = useState({mode: "create", show: false})

    const {data: dataTasks} = useFetch(`${APIURL}/tasks/${currentBoard}`, 'get')
    const [tasks, setTasks] = useState([])
    const taskContainerRef = useRef(null)

    const createTask = (task) => {
    
        fetch(`${APIURL}/create/task`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        })

        setTasks((prevTasks) => [...prevTasks, task])
    }

    const updateTask = (task) => {
        try {
            fetch(`${APIURL}/update/task/${task.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })

            const newTask = tasks.find(t => t.id === task.id)
            const index = tasks.indexOf(newTask)
            const newTasks = tasks.with(index, {...newTask, ...task})
            setTasks(newTasks)
        }
        catch (error) { 
            console.error(error)
        }
    }

    const deleteTask = (id) => {
        try {
            fetch(`${APIURL}/delete/task/${id}`, {
                method: "DELETE"
            })
            const newTasks = tasks.filter(task => task.id !== id)
            setTasks(newTasks)
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if(dataTasks?.result) {
            setTasks(dataTasks.result)
        }
    }, [dataTasks])
    
    const handleCLickTask = (task) => {
        setFormOptions(() => ({mode: 'update', show: true}))
        localStorage.setItem('selectedCurrentTask', JSON.stringify(task))
    }

    const handleCreateTask = () => {
        setFormOptions(()=> ({mode: 'create', show: true}))
    }

    return ( 
        <div className="board">
            {loading && <div className='loader'></div>}
            {error && <span>Error!</span>}
            {result && result.length > 0 && 
            <>
                <div className="board-header">
                    <div className="logo">
                        <img src="/images/Logo.svg" alt="logo" />
                    </div>
                    <div className="board-info">
                        <h1 className='board-title'>{result[0].title}</h1>
                        <p className='board-description'>{result[0].description}</p>
                    </div>
                </div>
                <ListTasks
                            handleCLickTask={handleCLickTask}
                            tasks={tasks}
                            taskContainerRef={taskContainerRef}  
                            ></ListTasks>
                <FooterBoard handleCreateTask={handleCreateTask}></FooterBoard>
            </>
            }
            {
                FormOptions.show 
                && 
                <FormBoard 
                    FormOptions={FormOptions} 
                    currentBoard={currentBoard} 
                    closeForm={setFormOptions}
                    createTask={createTask}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                    taskContainerRef={taskContainerRef}
                    ></FormBoard>
            }
        </div>
     );
}

export default Board;