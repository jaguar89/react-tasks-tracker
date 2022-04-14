const Header = ({ title, setShowAddTask, showAddTask }) => {
    return (
        <div className="header">
            <h2>{title}</h2>
            {
                showAddTask ?
                    <button className="btn" style={{ background: 'red' }}
                        onClick={() => {
                            setShowAddTask(!showAddTask)
                        }}>Hide </button>
                    :
                    <button className="btn" style={{ background: 'green' }}
                        onClick={() => {
                            setShowAddTask(!showAddTask)
                        }}>Show</button>
            }

        </div>
    );

}

Header.defaultProps = {
    title: 'Task Tracker'
}
export default Header;