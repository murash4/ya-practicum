import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo
} from '@ya.praktikum/react-developer-burger-ui-components'
import Btn from '../btn'
import styles from './style.module.css'

export default function AppHeader () {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <div className={styles.header_inner}>
        <div>
          <Btn
            icon={<BurgerIcon type="primary" />}
            text="Конструктор"
            color="primary"
          />
          <Btn
            icon={<ListIcon type="secondary" />}
            text="Лента заказов"
            color="secondary"
          />
        </div>

        <div className={`${styles.logo_wr} ml-2 mr-2`}>
          <Logo />
        </div>

        <div>
          <Btn
            icon={<ProfileIcon type="secondary" />}
            text="Личный кабинет"
            color="secondary"
          />
        </div>
      </div>
    </header>
  )
}
