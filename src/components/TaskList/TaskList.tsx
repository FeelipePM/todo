import { PlusCircle } from 'phosphor-react'
import styles from './TaskList.module.css'

const TaskList = () => {
  return (
    <section className={styles.taskList}>
      <header>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Adicionar uma nova tarefa"
          />
          <button type="submit">Criar <PlusCircle size={18} /></button>
        </div>
      </header>
      <main className={styles.content}>
        <div>
          <p>Tarefas criadas<span>0</span></p>
          <p>Concluídas<span>0</span></p>
        </div>
        <div>

        </div>
      </main>
    </section>
  )
}

export { TaskList }