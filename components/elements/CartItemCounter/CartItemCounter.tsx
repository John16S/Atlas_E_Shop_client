import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import { ICartItemCounterProps } from '@/types/shopping-cart'
// import MinusSvg from '../MinusSvg/MinusSvg'
// import PlusSvg from '../PlusSvg/PlusSvg'
import { $mode } from '@/context/mode'
import { updateCartItemFx } from '@/app/api/shopping-cart'
import { updateCartItemCount } from '@/context/shopping-cart'
import styles from '@/styles/cartPopup/cartPopup.module.scss'
import spinnerStyles from '@/styles/spinner/spinner.module.scss'
import MinusSvg from '../MinusSvg/MinusSvg'
import PlusSvg from '../PlusSvg/PlusSvg'

const CartItemCounter = ({
  totalCount,
  goodId,
  increasePrice,
  decreasePrice,
  initialCount,
}: ICartItemCounterProps) => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  
  const spinnerDarkModeClass =
    mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
  const [spinner, setPinner] = useState(false)
  const [count, setCount] = useState(initialCount)
  const [disableIncrease, setDisableIncrease] = useState(false) //чтобы нельзя было прибавить (больше чем на складе)
  const [disableDecrease, setDisableDecrease] = useState(false) //чтобы нельзя было убавить (меньше чем 1)

  //*чтоб автоматически сработало disable для + и -
  useEffect(() => {
    if (count === 1) {
      setDisableDecrease(true)
    }

    if (count === totalCount) {
      setDisableIncrease(true)
    }
  }, [count, totalCount])

  const increase = async () => {
    try {
      setPinner(true)
      increasePrice()
      setDisableDecrease(false)
      setCount(count + 1)

      const data = await updateCartItemFx({
        url: `/shopping-cart/count/${goodId}`,
        payload: { count: count + 1 },
      })

      updateCartItemCount({ goodId, count: data.count })
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setPinner(false)
    }
  }

  const decrease = async () => {
    try {
      setPinner(true)
      decreasePrice()
      setDisableIncrease(false)
      setCount(count - 1)

      const data = await updateCartItemFx({
        url: `/shopping-cart/count/${goodId}`,
        payload: { count: count - 1 },
      })

      updateCartItemCount({ goodId, count: data.count })
    } catch (e) {
      toast.error((e as Error).message)
    } finally {
      setPinner(false)
    }
  }

  return (
    <div
      className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}
    >
      
      <button disabled={disableDecrease} onClick={decrease}>
        <MinusSvg />
      </button>

      <span>
        {spinner ? (
          <span
            className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
            style={{ top: 4, left: 33, width: 20, height: 20 }}
          />
        ) : (
          count
        )}
      </span>

      <button disabled={disableIncrease} onClick={increase}>
        <PlusSvg />
      </button>

    </div>
  )
}

export default CartItemCounter
