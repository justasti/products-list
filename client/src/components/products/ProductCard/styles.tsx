import styled from 'styled-components'

export const StyledProductCard = styled.div<{ $isInputHidden: boolean }>`
  position: relative;
  font-family: 'Nunito Sans', sans-serif;
  color: #fff;
  background-color: #444;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border-bottom: 4px solid #26d4c4;
  padding: 12px;
  isolation: isolate;
  h3 {
    font-size: 1.2rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    white-space: break-spaces;
    text-align: center;
    margin-bottom: 8px;
    height: 48px;
  }
  .add-to-cart {
    display: flex;
    justify-content: end;
    align-items: center;
    width: 100%;
    input {
      z-index: 1;
      position: absolute;
      right: 30px;
      width: ${({ $isInputHidden: isInputHidden }) => (isInputHidden ? '0' : '40%')};
      transition: width 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      padding: 2px 4px;
      border: 2px solid #26d4c4;
      border-radius: 4px;
      &:focus {
        outline: none;
        border-color: #26d4c4;
      }
    }
  }
  button {
    z-index: 2;
    display: grid;
    place-content: center;
    align-self: flex-end;
    width: 36px;
    aspect-ratio: 1;
    border: 2px solid #26d4c4;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    transform: ${({ $isInputHidden: isInputHidden }) => (isInputHidden ? 'rotate(0)' : 'rotate(-360deg)')};
    transition:
      background-color 0.2s ease-in-out,
      transform 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover,
    &:focus {
      background-color: #26d4c4;
    }
  }
`
