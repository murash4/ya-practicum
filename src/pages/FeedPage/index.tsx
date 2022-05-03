import React from 'react'
import OrderFeed from '../../components/order-feed'
import mainStyles from '../IngredientsConstructorPage/style.module.css'
import SimpleBar from 'simplebar-react'
import styles from './style.module.css'

const FeedPage = () => {
  return (
    <main className={`${mainStyles.main_container} pt-10`}>
      <p className={`${mainStyles.main_container_title} text text_type_main-large mb-5`}>
        Лента заказов
      </p>
      <div className={`${styles.cols}`}>
        <SimpleBar className={`${styles.col} mr-5`}>
          <div className="pr-4">
            <OrderFeed isPublic={true} />
            <OrderFeed isPublic={true} />
            <OrderFeed isPublic={true} />
          </div>
        </SimpleBar>
        <SimpleBar className={`${styles.col} ml-5`}>
          <div className={`${styles.ordersStatusCols} mb-10`}>
            <div className={`${styles.ordersStatusCol}`}>
              <div className="text text_type_main-medium mb-4">Готовы:</div>
              <div className="text text_type_digits-default mb-1 success-color">034533</div>
            </div>
            <div className={`${styles.ordersStatusCol}`}>
              <div className="text text_type_main-medium mb-4">В работе:</div>
              <div className="text text_type_digits-default mb-1">034533</div>
            </div>
          </div>
          <div className="text text_type_main-medium">Выполнено за все время:</div>
          <div className="text text_type_digits-large mb-10">28 752</div>
          <div className="text text_type_main-medium">Выполнено за сегодня:</div>
          <div className="text text_type_digits-large">138</div>
        </SimpleBar>
      </div>
    </main>
  )
}

export default FeedPage
