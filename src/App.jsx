import { useState } from "react";
import "./app.css";
import Task from "./components/Task";

import TaskHookForm from "./components/TaskHookForm";
import PeopleForm from "./components/PeopleForm";
import { initialTasks, initialTeam } from "./data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [team, setTeam] = useState(initialTeam);

  function handleTaskSubmit(yeniTask) {
    toast("Yeni görev oluşturuldu.");

    setTasks([yeniTask, ...tasks]);
  }

  function handlePeopleSubmit(yeniKisi) {
    toast("Yeni kişi oluşturuldu.");
    setTeam([...team, yeniKisi]);
  }

  function handleComplete(id) {
    const clonedTasks = [...tasks];

    const updatedTasks = clonedTasks.map((t) => {
      if (t.id === id) {
        t.status = "yapıldı";
      }
      return t;
    });
    setTasks(updatedTasks);
    // toast(`${id} idli görev tamamlandı.`)
    toast("2 idli görev tamamlandı.");
    console.log("tamamlama fonksiyonunu buraya yazın", id);
  }

  return (
    <div className="app">
      <ToastContainer />
      <div className="formColumn">
        <div className="form-container">
          <h2>Yeni Task</h2>
          {/* <TaskForm kisiler={team} submitFn={handleTaskSubmit} /> */}
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="column-title">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapılacak")
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="column">
          <h2 className="column-title">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === "yapıldı")
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
