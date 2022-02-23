import style from './style.module.css'
import checkboxImg from '../../images/done.png'

export default function OrderDetails () {
  return (
    <div className={`${style.order_details} pt-30 pb-30`}>
      <p className="text text_type_digits-large mb-8">
        034536
      </p>
      <p className="text text_type_main-medium mb-15">
        идентификатор заказа
      </p>
      <img
        src={checkboxImg}
        alt=""
        className={`${style.checkbox} mb-15`}
      />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}
