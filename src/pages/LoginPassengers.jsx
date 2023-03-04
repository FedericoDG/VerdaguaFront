import LoginForm from '../components/loginpassengers/Login'
import imgLogin from '../assets/login.webp'

import styles from './login.module.css'

const Login = () => (
  <div className={styles.container}>
    <LoginForm />
    <div className={styles.boxImg}>
      <img alt="login-img" src={imgLogin} />
    </div>
  </div>
)

export default Login
