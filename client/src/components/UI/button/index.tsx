import { FC, PropsWithChildren } from 'react'
import { StyledButton } from './styles'

interface Props {
  disabled?: boolean
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: FC<PropsWithChildren<Props>> = ({ children, disabled, onClick }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
