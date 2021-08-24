import styles from '../styles/components/NavigationBar.module.css'

const NavigationBar = ({ children }) => {
  return ( 
    <nav className={styles.navigationBar}>
      { children }
    </nav>
  );
}
 
export default NavigationBar;