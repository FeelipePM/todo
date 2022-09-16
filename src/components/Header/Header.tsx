import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div>
        <img src="/logo.svg" alt="todolist" />
      </div>
    </header>
  )
}

export { Header }