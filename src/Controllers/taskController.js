// CRUD for TaskList Component
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc
} from 'firebase/firestore'
import { db } from '../firebase'

export const addTaskController = async (task) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), task)

    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

export const readTaskController = async () => {
  const querySnapshot = await getDocs(collection(db, 'tasks'))
  const tasks = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    }
  })

  return tasks
}

export const updateTaskController = async (task) => {
  await setDoc(doc(db, 'tasks', task.id), {
    title: task.title,
    description: task.description
  })
}

export const deleteTaskController = async (id) => {
  await deleteDoc(doc(db, 'tasks', id))
}
