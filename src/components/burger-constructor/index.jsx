import ConstructorList from './constructor-list'
import ConstructorFooter from "./constructor-footer";
import style from './style.module.css'
import PropTypes from 'prop-types'
import { ingredientType } from '../../utils/types'

export default function BurgerConstructor (props) {
  return (
    <section className={`${style.section} pb-10`}>
      <ConstructorList data={props.data} />

      <ConstructorFooter data={props.data} />
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired)
}
