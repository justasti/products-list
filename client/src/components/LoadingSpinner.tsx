import { BlocksShuffleThree } from 'react-svg-spinners'
import styled from 'styled-components'

const LoadingSpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  h3 {
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
`
export const LoadingSpinner = () => {
  return (
    <LoadingSpinnerContainer>
      <BlocksShuffleThree color='#FFFFFFBB' height={60} width={60} />
      <h3>Loading...</h3>
    </LoadingSpinnerContainer>
  )
}
