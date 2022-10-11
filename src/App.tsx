import { Header, TaskList } from './components'

import './styles/global.css'
import styles from './styles/App.module.css';

export function App() {
  return (
    <div className={styles.container}>
      <Header />
      <TaskList />
    </div>
  )
}
