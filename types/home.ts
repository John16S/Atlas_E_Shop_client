import { IGood } from "./goods"

export interface IHomeSlider {
  items: IGood[]
  spinner: boolean
  goToGoodPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
