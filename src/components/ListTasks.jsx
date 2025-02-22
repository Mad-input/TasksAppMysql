import Task from "./Task";

function ListTasks({handleCLickTask, tasks, taskContainerRef}) {
    
    
    return ( 
        <ul className="tasks" ref={taskContainerRef}>
            {
                tasks && tasks.length > 0 
                ? tasks.map((task) => (
                    <Task key={task.id} task={task} handleCLickTask={handleCLickTask} ></Task>
                ))
                : ''
            }
        </ul>
     );
}

export default ListTasks;