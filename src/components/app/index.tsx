import React  from 'react'
import ProtectedRoute from '../protected-route'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useHistory
} from 'react-router-dom'
import {
  IngredientsConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileOrdersPage,
  IngredientsPage,
  FeedPage,
  OrderInfoPage,
  Page404
} from '../../pages'
import AppHeader from '../app-header'
import IngredientDetails from '../ingredient-details'
import Modal from '../hocs/modal'
import { CLEAR_INGREDIENT_DETAILS } from '../../services/actions/ingredientDetails'
import { useDispatch } from '../../services/store'
import { TLocation } from '../../utils/types'

function App () {
  return (
    <Router>
      <AppInner />
    </Router>
  )
}

type TUpgradeLocation = TLocation & {
  backgroundLocation?: TLocation
}

function AppInner () {
  const location = useLocation<TUpgradeLocation>()
  const history = useHistory()
  const dispatch = useDispatch()
  const backgroundLocation = location?.state?.backgroundLocation

  /**
   * Скрыть попап с деталями об ингредиенте
   */
  const modalCloseHandler = (): void => {
    history.goBack()
    dispatch({
      type: CLEAR_INGREDIENT_DETAILS
    })
  }

  return (
    <div className="content">
      <AppHeader />

      <Switch location={backgroundLocation || location}>
        <Route
          path="/"
          exact={true}
        >
          <IngredientsConstructorPage />
        </Route>
        <Route path="/ingredients/:id">
          <IngredientsPage />
        </Route>
        <Route
          exact
          path="/feed"
          children={<FeedPage />}
        />
        <Route path="/feed/:id">
          <OrderInfoPage notInModal={true} />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute
          path="/profile"
          exact={true}
        >
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/profile/orders"
          exact={true}
        >
          <ProfileOrdersPage />
        </ProtectedRoute>
        <ProtectedRoute
          path="/profile/orders/:id"
          exact={true}
        >
          <OrderInfoPage
            notInModal={true}
            isPrivate={true}
          />
        </ProtectedRoute>
        <Route>
          <Page404 />
        </Route>
      </Switch>

      {backgroundLocation &&
        <Route path="/ingredients/:id">
          <Modal
            title="Детали ингредиента"
            close={modalCloseHandler}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      }

      {backgroundLocation &&
        <Route path="/feed/:id">
          <Modal close={() => history.goBack()}>
            <OrderInfoPage />
          </Modal>
        </Route>
      }

      {backgroundLocation &&
        <ProtectedRoute
          path="/profile/orders/:id"
          exact={true}
        >
          <Modal close={() => history.goBack()}>
            <OrderInfoPage />
          </Modal>
        </ProtectedRoute>
      }
    </div>
  )
}

export default App;
