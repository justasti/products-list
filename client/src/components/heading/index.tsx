import { FC, PropsWithChildren } from 'react'
import {
  StyledHeading1,
  StyledHeading2,
  StyledHeading3,
  StyledHeading4,
  StyledHeading5,
  StyledHeading6,
} from './styles'
interface Props {
  level: number
}

export const Heading: FC<PropsWithChildren<Props>> = ({ level, children }) => {
  if (level === 1) return <StyledHeading1>{children}</StyledHeading1>
  else if (level === 2) return <StyledHeading2>{children}</StyledHeading2>
  else if (level === 3) return <StyledHeading3>{children}</StyledHeading3>
  else if (level === 4) return <StyledHeading4>{children}</StyledHeading4>
  else if (level === 5) return <StyledHeading5>{children}</StyledHeading5>
  else if (level === 6) return <StyledHeading6>{children}</StyledHeading6>
  else return null
}
