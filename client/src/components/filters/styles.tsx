import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  z-index: 6;
`

export const StyledFilters = styled(motion.div)`
  background-color: #fff;
  position: fixed;
  inset: 20% 0 0 0;
  z-index: 10;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  overflow-y: auto;
  border-radius: 10px 10px 0 0;
`
