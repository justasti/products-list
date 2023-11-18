import { FC } from 'react'
import { StyledLink } from './styles'

interface Props {
  link: string
  text: string
}

export const LinkButton: FC<Props> = ({ link, text }) => {
  return <StyledLink to={link}>{text}</StyledLink>
}
