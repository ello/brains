import { PROMOTIONS } from '../constants/action_types'
import { authenticationPromo } from '../networking/api'

export const fetchAuthenticationPromos = () => ({
  type: PROMOTIONS.AUTHENTICATION,
  payload: {
    endpoint: authenticationPromo(),
  },
})

export default fetchAuthenticationPromos

