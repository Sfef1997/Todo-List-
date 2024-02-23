
import { addBtn, getDeleteIcons, getcheckboxElements, taskListELement, taskListLink, themBtn } from "./elements"
import { addTask, deleteTask, toggelTask, toggleThem } from "./uitls"

  taskListLink.addEventListener("click", ()=> {
    taskListELement?.classList.toggle("TaskList__list--hideCompleted")
    taskListLink?.classList.toggle("TaskList__link--isActive")
})


export const initalTaskListener = () => {
getDeleteIcons().forEach((icon, index) => {
    icon.addEventListener("click", (e) => deleteTask(e, index));
  });
  getcheckboxElements().forEach((box,index)=> {
    box.addEventListener("click", (e) => toggelTask(e, index))
    box.addEventListener("keydown",(e)=> {
        e.key === "Enter" && toggelTask(e,index)
    })
  })
};



export const initListners = () => {
    themBtn.addEventListener("click",toggleThem )
    addBtn.addEventListener("click", addTask)
}
