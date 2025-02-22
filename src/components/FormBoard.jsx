import { useEffect, useState} from "react";

function FormBoard({FormOptions: {mode}, currentBoard, closeForm, createTask, updateTask, deleteTask, taskContainerRef}) {
    const [currentTask, setCurrentTask] = useState({
        id: "",
        title: "",
        description: "",
        state: "",
        icon: "",
        board: currentBoard
    })

    const icons = ["bee", "book", "clock", "dialog", "pc"]
    const status = [{name: 'completed', prefix: 'completed', icon: 'done'}, {name: 'in progress', prefix: 'progress', icon: 'progress'}, {name: 'won`t do', prefix:'donot', icon: 'donot'}]

    const [currentIcon, setCurrentIcon] = useState("")
    const [currentState, setCurrentState] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const newTitle = data.get("title")
        const newDescription = data.get("description")
        

        if(mode === "create" && taskContainerRef.current) {
            const newTask = {
                id: crypto.randomUUID(), 
                title: newTitle, 
                description: newDescription, 
                state: currentState, 
                icon: currentIcon || 'bee', 
                board: currentBoard}
            createTask(newTask)
            taskContainerRef.current.scrollTop += 200
        }
        else if (mode === "update") {
            updateTask({...currentTask, title: newTitle, description: newDescription, state: currentState, icon: currentIcon})
        }
        
        closeModal()
    }

    const handleDelete = () => {
        if (mode === "update") {
            deleteTask(currentTask.id)
            closeModal()
        }
    }
    const closeModal = () => {
        closeForm(() => ({mode: "", show: false}))
    }

    useEffect(() => {
        if (mode === "update") {
            const savedTask = JSON.parse(localStorage.getItem("selectedCurrentTask"))
            setCurrentTask(savedTask)
            setCurrentState(savedTask.state)
            setCurrentIcon(savedTask.icon)
        }
    }, [mode,taskContainerRef])
    return ( 
        <div className="background">
            <div className="container-form">
                <div className="header-form">
                    <h2>Task details</h2>
                    <button onClick={closeModal}>
                        <img src="/images/close_ring_duotone-1.svg" alt="icon" />
                    </button>
                </div>
                <form className="form" onSubmit={onSubmit}>
                    <div className="container-inputs">
                        <div className="container-input">
                            <label htmlFor="title" className="title-form">Task Name</label>
                            <input type="text" id="title" defaultValue={currentTask.title} className="input-form title" placeholder="Enter a task name" name="title"/>
                        </div>
                        <div className="container-input">
                            <label htmlFor="description" className="title-form">Task description</label>
                            <textarea id="description" className="input-form textarea" defaultValue={currentTask.description} placeholder="Enter a short description" name="description"></textarea>
                        </div>

                        <div className="icons">
                            <label className="title-form">Icons</label>
                            <div className="container-icons">
                                {icons.map((icon, i) => (
                                    <button key={i} className={`icon ${currentIcon === icon ? 'selected' : ''}`} onClick={() => setCurrentIcon(icon)} type="button">
                                        <img src={`/icons/${icon}.svg`} alt="icon" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="status">
                            <label className="title-form">Status</label>
                            <div className="container-status">
                                {status.map((state, i) => (
                                    <button key={i} className={`state ${currentState === state.prefix ? 'selected' : ''}`} onClick={() => setCurrentState(state.prefix)} type="button">
                                        <div className={`tag ${state.prefix}`}>	
                                            <img src={`/images/${state.icon}.svg`} alt="icon" />
                                        </div>
                                        <span className="state-name">{state.name}</span>
                                        <svg className="checkIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                            <path d="M9 12l2 2l4 -4"></path>
                                        </svg>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="buttons-options">
                        <button type="button" className="btn btn-cancel" onClick={handleDelete} disabled={mode === "create"}>
                            <span>
                                Delete
                            </span>
                            <img src="/images/Trash.svg" alt="icon" />
                        </button>
                        <button type="submit" className="btn btn-save">
                            <span>
                                Save
                            </span>
                            <img src="/images/completed.svg" alt="icon" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
     );
}

export default FormBoard;