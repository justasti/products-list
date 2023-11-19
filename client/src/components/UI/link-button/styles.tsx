import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 0.8rem;
  border: 1px solid #444;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 32px;
  display: inline-block;
  padding: 12px 16px;
  background-color: #fff;
  transition: all 0.2s ease-in-out;
  &:hover,
  &:focus {
    background-color: #444;
    color: #fff;
  }
`
