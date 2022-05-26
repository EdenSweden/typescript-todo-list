import { v4 as uuidV4 } from 'uuid'

//how to make a custom type (see where it's used in addListItem fn below):
type Task = {
    id: string, 
    title: string, 
    completed: boolean, 
    createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")
//This is how to declare an array of items that are typed as a Task, seen above:
const tasks: Task[] = loadTasks()
//adds tasks from local storage:
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
  e.preventDefault()

  /*the optional chaining operator (?) is necessary here in TS, as TS will throw an error since the element could be null (aka it doesn't exist)*/
  if (input?.value == "" || input?.value == null) return

  /*Here, TS is smart enough to know that these properties match your custom Task type above. So it assumes this is a Task:*/
  /*const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }*/

  //But it's usually best to declare it anyway:

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask)
  saveTasks()

  addListItem(newTask)
  //clears input after submitted:
  input.value = ""
})

function addListItem(task: Task){
  
  const item = document.createElement("li")
  //TS automatically now knows that 'item' above should have a type of HTMLLIElement.
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
  //always use ?. syntax in TS when an element could be null, so you don't get an error.
}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[]{
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}