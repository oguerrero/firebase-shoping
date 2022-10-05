import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  addTaskController,
  deleteTaskController,
  readTaskController,
  updateTaskController
} from '../Controllers/taskController'

const TaskList = () => {
  const [task, setTask] = useState({ title: '', description: '' })
  const [tasks, setTasks] = useState([])
  const [mode, setMode] = useState('add')

  const getTasks = () => {
    readTaskController()
      .then((t) => setTasks([...t]))
      .catch((e) => console.log(e))
  }

  const addTask = async () => {
    await addTaskController(task)
    setTask({ title: '', description: '' })
    getTasks()
    toast.custom((t) => (
      <div className='px-8 py-4 bg-indigo-700 rounded-full shadow-lg'>
        <h1 className='text-lg  font-semibold text-white'>Task Added</h1>
      </div>
    ))
  }

  const editTask = (id) => {
    setMode('update')
    const tempTask = tasks.find((t) => t.id === id)
    setTask({ ...tempTask })
  }

  const updateTask = async () => {
    await updateTaskController(task)
    getTasks()
    setMode('add')
    toast.custom((t) => (
      <div className='px-8 py-4 bg-yellow-500 rounded-full shadow-lg'>
        <h1 className='text-lg font-semibold text-white'>Task Edited</h1>
      </div>
    ))
  }

  const deleteTask = async (id) => {
    await deleteTaskController(id)
    getTasks()
    toast.custom((t) => (
      <div className='px-8 py-4 bg-rose-700 rounded-full shadow-lg'>
        <h1 className='text-lg font-semibold text-white'>Task Deleted</h1>
      </div>
    ))
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center gap-4 text-center'>
      <h1 className='text-lg font-semibold text-yellow-600'>TaskList</h1>
      <h2>Introduce una nueva tarea</h2>
      <input
        type='text'
        value={task.title}
        className='w-1/3 px-2 py-1 border rounded shadow outline-none focus:ring ring-1 ring-yellow-200'
        placeholder='title'
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      <textarea
        rows={3}
        placeholder='description'
        className='w-1/3 px-2 py-1 border rounded shadow outline-none resize-none focus:ring ring-1 ring-yellow-200'
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      {mode === 'add' ? (
        <button
          className='px-6 py-1 font-semibold text-white transition rounded-full shadow-lg bg-sky-400 hover:bg-cyan-700 '
          onClick={addTask}>
          ADD
        </button>
      ) : (
        <button
          className='px-6 py-1 font-semibold text-white transition bg-yellow-500 rounded-full shadow-lg hover:bg-orange-500'
          onClick={updateTask}>
          UPDATE
        </button>
      )}

      <div className='grid w-4/5 grid-cols-1 gap-4 px-8 md:grid-cols-3 md:w-full'>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='flex flex-col gap-2 p-4 border border-yellow-300 rounded-lg'>
            <h1 className='font-semibold text-left'>{task.title}</h1>
            <div className='border-t border-yellow-300 '></div>
            <h1 className='text-left'>{task.description}</h1>
            <div className='flex justify-between gap-2 '>
              <button
                className='px-6 py-1 font-semibold text-white transition bg-yellow-400 rounded-full shadow-lg hover:bg-yellow-500'
                onClick={() => editTask(task.id)}>
                EDIT
              </button>
              <button
                className='px-6 py-1 font-semibold text-white transition rounded-full shadow-lg bg-rose-500 hover:bg-red-600'
                onClick={() => deleteTask(task.id)}>
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
