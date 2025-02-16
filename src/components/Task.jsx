function Task({task, handleCLickTask}) {

    return ( 
        <li className={`board-task ${task.state === "" ? 'do' : task.state}`} id={task.id} onClick={() => handleCLickTask(task)}>
            <div className="icon">
                <img src={`/icons/${task.icon}.svg`} alt="icon" />
            </div>
            <div className="task-info">
                <strong className="task-title">{task.title}</strong>
                {task.description.length > 0 ? <p className="task-description">{task.description}</p> : ''}
            </div>
            {task.state !== '' 
                ? 
                <div className="state">
                    <div className={`tag ${task.state}`}>
                        <img src={`/images/${task.state}.svg`} alt="tag-state" />
                    </div>
                </div>
                : '' 
            }
        </li>
     );
}

export default Task;