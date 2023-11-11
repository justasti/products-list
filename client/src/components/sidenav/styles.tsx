import styled from 'styled-components'

interface NavProps {
  $mobile: boolean
}

export const StyledNavbar = styled.nav<NavProps>`
  width: 200px;
  padding: ${({ $mobile }) => ($mobile ? '16px' : '64px 16px')};
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
  .category-title {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-bottom: 16px;
    cursor: pointer;
    transition: 0.5s cubic-bezier(0.25, 0.75, 0.5, 1.25);
    &:hover {
      color: #0e8388;
    }
  }
  .hidden {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    border-right: unset;
    border-top: 1px solid #ccc;
    position: fixed;
    top: 100dvh;
    transform: translateY(-100%);
    width: 100%;
    height: 72px;
    flex-direction: row;
    display: flex;
    align-items: center;

    ul {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }

    .category-title {
      margin: 0;
    }
  }
`
