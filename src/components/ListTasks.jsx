import Task from "./Task";

function ListTasks({handleCLickTask, tasks, loading, error, taskContainerRef}) {
    
    
    return ( 
        <ul className="tasks" ref={taskContainerRef}>
            {loading && <span>loading...</span>}
            {error && <span>error...</span>}
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