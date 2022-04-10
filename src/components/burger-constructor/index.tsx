import React from 'react'
import ConstructorList from './constructor-list'
import ConstructorFooter from './constructor-footer'
import style from './style.module.css'

export default function BurgerConstructor () {
  return (
    <section className={`${style.section} pb-10`}>
      <ConstructorList />

      <ConstructorFooter />
    </section>
  )
}
