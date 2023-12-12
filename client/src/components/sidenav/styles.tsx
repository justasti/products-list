import styled from 'styled-components'

interface NavProps {
  $mobile: boolean
}

export const StyledNavbar = styled.nav<NavProps>`
  z-index: 5;
  width: 200px;
  padding: 64px 16px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  left: 0;
  height: 100dvh;
  border-right: 1px solid #ccc;
  border-top: unset;
  background-color: #fff;
  > ul {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  li {
    list-style-type: none;
  }
  a {
    color: inherit;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    display: flex;
    gap: 16px;
    &.active,
    &:hover {
      color: #26d4c4;
    }
  }
  .hidden {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    border-right: unset;
    background-color: #e5e5e5;
    position: fixed;
    top: 100dvh;
    transform: translateY(-100%);
    width: 100%;
    height: 72px;
    flex-direction: row;
    display: flex;
    align-items: center;
    padding: 16px;

    ul {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      li {
        display: flex;
        align-items: center;
      }
    }
  }
`
