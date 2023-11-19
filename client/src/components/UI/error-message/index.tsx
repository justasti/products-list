import { ErrorOutlineTwoTone } from '@mui/icons-material'
import { FC, PropsWithChildren } from 'react'
import { ErrorMessageContainer } from './styles'

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorMessageContainer>
      <ErrorOutlineTwoTone />
      {children}
    </ErrorMessageContainer>
  )
}
