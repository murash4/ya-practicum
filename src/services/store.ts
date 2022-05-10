import { rootReducer } from './reducers'

import {
  TypedUseSelectorHook,
  useSelector as useSelectorHook,
} from 'react-redux'

export type RootState = ReturnType<typeof rootReducer>

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorHook
