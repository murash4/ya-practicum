import React from 'react';
import styles from './style.module.css';
import AppHeader from '../app-header'
import BurgerIngredients from '../burger-ingredients'
import BurgerConstructor from '../burger-constructor'
import { mockData } from '../../utils/data'

function App() {
  return (
    <>
      <AppHeader />

      <main className={`${styles.main_container} pt-10`}>
        <p className={`${styles.main_container_title} text text_type_main-large mb-5`}>
          Соберите бургер
        </p>

        <BurgerIngredients data={mockData} />

        <BurgerConstructor data={mockData} />
      </main>
    </>
  );
}

export default App;
