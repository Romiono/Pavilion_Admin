import { toast } from 'react-toastify'

type INotification = {
  type: 'success' | 'error' | 'info' | 'warning'
  text?: string
}

export const openNotification: (val: INotification) => void = (val) => {
  toast(val.text, {
    type: val?.type || 'info'
  })
}
