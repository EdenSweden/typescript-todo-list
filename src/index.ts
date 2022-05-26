import { v4 as uuidV4 } from 'uuid'


const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

form?.addEventListener("submit", e => {
  e.preventDefault()

  /*the optional chaining operator (?) is necessary here in TS, as TS will throw an error since the element could be null (aka it doesn't exist)*/
  if (input?.value == "" || input?.value == null) return

  const task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  input.value
})