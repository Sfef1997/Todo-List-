import { mainElment, searchInput, taskListELement } from "./elements"
import { initalTaskListener } from "./eventListners"



export const fetchDaat = (key)=>{
   const data = localStorage.getItem(key)
   return data ? JSON.parse(data) :false
}

export const renderTaskList = (tasks)=> {
     let taskList =``
    tasks?.forEach((task) => {
        taskList +=  `<li class="${task.isCompleted ? "TaskList__taskContent--isActive" : "TaskList__taskContent"} " >
        <div class="TaskList__checkbox" tabindex="0" role="button"> 
        <img class="TaskList__checkboxImg" src="./assets/icon-checkmark.svg" alt"checkmark" />
            </div>
        <div class="TaskList__valueContent">
        <p class="TaskList__value">
        ${task.value}
        </p>
        <img src="./assets/icon-basket.svg" alt="basket icon" class="TaskList__deleteIcon" />
        </div>
        </li>`
        })
        taskListELement.innerHTML = taskList
        searchInput.value=""
}

export const deleteTask =(e,index)=> {
 const answer = confirm("are you sure you want delete that Task ? 🤔")
    if(answer === false) return
    const tasks = fetchDaat("tasks")
    tasks.splice(index,1)
    saveToDB("tasks",tasks)
     initTaskList(tasks)
    //  emptyState()
}


export const addTask = (e)=> {
    e.preventDefault()
    if(searchInput.value){
        const task ={
            value : searchInput.value,
            isCompleted :false,
        }
        const tasks = fetchDaat("tasks") || []
        tasks?.push(task)
        saveToDB("tasks",tasks)
        initTaskList(tasks)
    }
}

export const toggleThem = () => {
    mainElment.classList.toggle("App--isDark")
    saveToDB("darkModeFlag", mainElment?.classList.contains("App--isDark"))
}

export const saveToDB = (key,data)=> {
    localStorage.setItem(key,JSON.stringify(data))
} 

export const initDataOnStartUp = () => {
    fetchDaat("darkModeFlag") && toggleThem()
    initTaskList(fetchDaat("tasks"))
}

export const initTaskList= (tasks) => {
if(tasks.length){
        renderTaskList(tasks);
        initalTaskListener();
    }else{
        const emptyStateImg= `<img class="EmptyList__img" src="assets/icon-empty.svg" alt="Empty state Icon"/>` 
        taskListELement.innerHTML = emptyStateImg
    }
}

export const toggelTask = (e,index) => {
    const  tasks = fetchDaat("tasks")
    e.currentTarget.parentElement?.classList.toggle("TaskList__taskContent--isActive")

    tasks[index].isCompleted = !tasks[index].isCompleted
    saveToDB("tasks",tasks)
}