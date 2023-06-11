import { IGoods } from "./goods"

export interface IHomeSlider {
  items: IGoods[]
  spinner: boolean
  goToGoodPage?: boolean
}

export interface ICartAlertProps {
  count: number
  closeAlert: VoidFunction
}
