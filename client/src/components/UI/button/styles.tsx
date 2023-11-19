import styled from 'styled-components'

export const StyledButton = styled.button<{ disabled: boolean }>`
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
  position: relative;
  overflow: hidden;
  animation: ${({ disabled }) => (disabled ? 'pulse 1.5s ease infinite alternate' : 'none')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  &:hover,
  &:focus {
    background-color: #444;
    color: ${({ disabled }) => (disabled ? '#444' : '#fff')};
  }

  @keyframes pulse {
    0% {
      background-color: #eee;
    }
    70% {
      background-color: #ddd;
    }
    100% {
      background-color: #eee;
    }
  }
`
