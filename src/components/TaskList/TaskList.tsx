import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { PlusCircle, FileText } from 'phosphor-react'

import { Task } from '../../components';

import styles from './TaskList.module.css'

interface Tasks {
  id: string;
  taskTitle: string;
  isComplete: boolean;
}

const TaskList = () => {
  const isLocalStorageNull = localStorage.getItem('tasks-local-storage')

  if (!isLocalStorageNull) {
    localStorage.setItem('tasks-local-storage', '[]');
  }

  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [taskName, setTaskName] = useState('');
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const isInputEmpty = taskName.trim().length === 0;

  useEffect(() => {
    const JSONlocalStorage = localStorage.getItem('tasks-local-storage');
    const convertedJSON = JSON.parse(JSONlocalStorage!)
    setTasks(convertedJSON)
  }, [])

  useEffect(() => {
    const tasksDone = tasks.reduce((acc, { isComplete }) => {
      return isComplete ? acc + 1 : acc
    }, 0)

    setTasksCompleted(tasksDone)
  }, [tasks])

  const handleCreateNewTask = (e: FormEvent) => {
    e.preventDefault();

    if (!isInputEmpty) {
      const newTask = {
        id: uuidv4(),
        taskTitle: taskName,
        isComplete: false
      }
      setTasks([newTask, ...tasks])
      setTaskName('')
      localStorage.setItem('tasks-local-storage', JSON.stringify([newTask, ...tasks]))
    }
  }

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value)
  }

  const handleTaskCompleted = (id: string) => {
    const checkedTask = tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task)
    setTasks(checkedTask)
  }


  const handleDeleteTask = (id: string) => {
    const deletedTask = tasks.filter(task => task.id !== id)
    setTasks(deletedTask)
    localStorage.setItem('tasks-local-storage', JSON.stringify(deletedTask))
  }

  return (
    <div className={styles.container}>
      <section className={styles.taskList}>
        <header>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Adicionar uma nova tarefa"
              name='taskName'
              onChange={handleOnChangeInput}
              value={taskName}
            />
            <button type="submit" onClick={handleCreateNewTask}>Criar <PlusCircle size={18} /></button>
          </div>
        </header>
        <main className={styles.content}>
          <div>
            <p>Tarefas criadas<span>{tasks.length}</span></p>
            <p>Concluídas<span>{tasksCompleted} de {tasks.length}</span></p>
          </div>
        </main>
      </section>
      {tasks.length ?
        <section className={styles.taskWrapper}>
          {tasks.map(({ id, taskTitle, isComplete }) => (
            <ul key={id}>
              <Task
                id={id}
                taskTitle={taskTitle}
                isComplete={isComplete}
                onCheckTask={handleTaskCompleted}
                onDeleteTask={handleDeleteTask}
              />
            </ul>
          ))}
        </section>
        :
        <section className={styles.tasksEmpty}>
          <FileText size={56} />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </section>
      }
    </div >
  )
}

export { TaskList }