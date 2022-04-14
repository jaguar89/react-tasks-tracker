import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import { useEffect, useState } from "react";

function App() {

  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/tasks`)
      .then(res => res.json())
      .then(body => setTasks(body))
      .catch(err => console.log(err));
  }, []);

  const addTask = (task) => {
    fetch(`http://localhost:8000/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(res => res.json())
      .then(body => {
        setTasks([...tasks, body]);
      });
  };

  const onDelete = (id) => {
    fetch(`http://localhost:8000/tasks/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(body => setTasks(tasks.filter(t => t.id !== id)))
      .catch(err => console.log(err));
  };

  const onToggle = (id) => {
    const task = tasks.find(t => t.id === id);
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...task, reminder: !task.reminder })
    })
      .then(res => res.json())
      .then(body => setTasks(tasks.map(t => t.id === id ? { ...t, reminder: !t.reminder } : t)))
      .catch(err => console.log(err));
  }

  return (
    <Router>
      <div className="container">
        <Header setShowAddTask={setShowAddTask} showAddTask={showAddTask} />
        <Routes>
          <Route path="/" element={
            <>
              {showAddTask && <AddTask addTask={addTask} />}
              <Tasks tasks={tasks} onToggle={onToggle} onDelete={onDelete} />
            </>
          }></Route>
          <Route path="/about" element={<About />}> </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
