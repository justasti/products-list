import styled from 'styled-components'

export const Wrapper = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`

export const ProductsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 18px 12px;
`
