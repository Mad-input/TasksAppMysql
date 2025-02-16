function FooterBoard({handleCreateTask}) {

    return ( 
        <footer className="board-footer">
            <button className="board-btn-add" onClick={handleCreateTask}>
                <img src="/images/Add_round_duotone.svg" alt="icon" />
            </button>
            <span>Add new task</span>
        </footer>
     );
}

export default FooterBoard;