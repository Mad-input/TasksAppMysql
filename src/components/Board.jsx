import { useEffect, useRef, useState } from 'react';
import useFetch from '../hook/useFetch.js';
import FooterBoard from './FooterBoard.jsx';
import ListTasks from './ListTasks.jsx';
import FormBoard from './FormBoard.jsx';



function Board({currentBoard}) {
    const {data: {result}, loading, error} = useFetch(`http://localhost:3000/board/${currentBoard}`, 'get')
    const [FormOptions, setFormOptions] = useState({mode: "create", show: false})

    const {data: dataTasks, loading: loadindTasks, error: errorTasks} = useFetch(`http://localhost:3000/tasks/${currentBoard}`, 'get')
    const [tasks, setTasks] = useState([])
    const taskContainerRef = useRef(null)

    const createTask = (task) => {
    
        fetch("http://localhost:3000/create/task", {
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
            fetch(`http://localhost:3000/update/task/${task.id}`, {
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
            fetch(`http://localhost:3000/delete/task/${id}`, {
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
            {loading && <span>loading...</span>}
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
                            error={errorTasks}
                            loading={loadindTasks}
                            taskContainerRef={taskContainerRef}  
                            ></ListTasks>
                <FooterBoard handleCreateTask={handleCreateTask}></FooterBoard>
            </>
            }
            {
                FormOptions.show && <FormBoard 
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