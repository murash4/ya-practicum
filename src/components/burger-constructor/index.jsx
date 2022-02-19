import ConstructorList from './constructor-list'
import SimpleBar from 'simplebar-react'
import ConstructorFooter from "./constructor-footer";
import style from './style.module.css'

export default function BurgerConstructor (props) {
  return (
    <section className={`${style.section} pb-10`}>
      <SimpleBar className={`${style.simplebar} mb-10 pl-4 pr-4`}>
        <ConstructorList data={props.data} />
      </SimpleBar>

      <ConstructorFooter data={props.data} />
    </section>
  )
}
