import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ProductsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 18px 12px;
  h1 {
    margin: 48px 24px 64px;
    text-transform: uppercase;
    text-align: center;
    font-size: 2.25rem;
    line-height: 1.5;
    font-weight: 700;
    letter-spacing: 2px;
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-color: #ccc;
  }
`
