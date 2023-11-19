import { FC, PropsWithChildren } from 'react'
import { StyledButton } from './styles'

interface Props {
  disabled: boolean
}

export const Button: FC<PropsWithChildren<Props>> = ({ children, disabled }) => {
  return <StyledButton disabled={disabled}>{children}</StyledButton>
}
