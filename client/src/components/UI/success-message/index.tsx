import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone'
import { FC, PropsWithChildren } from 'react'
import { SuccessMessageContainer } from './styles'

export const SuccessMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SuccessMessageContainer>
      <CheckCircleOutlineTwoToneIcon />
      {children}
    </SuccessMessageContainer>
  )
}
