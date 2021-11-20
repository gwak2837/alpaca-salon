import { ALPACA_SALON_ACHROMATIC_COLOR, ALPACA_SALON_COLOR } from 'src/models/constants'
import styled from 'styled-components'

export const PrimaryButton = styled.button<{ disabled?: boolean }>`
  background: ${(p) => (p.disabled ? ALPACA_SALON_ACHROMATIC_COLOR : ALPACA_SALON_COLOR)};
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 1rem;
  text-align: center;
  width: 100%;
  cursor: pointer;

  :hover {
    background: ${(p) => (p.disabled ? ALPACA_SALON_ACHROMATIC_COLOR : ALPACA_SALON_COLOR)}e0;
  }
  transition: background 0.3s ease-out;
`
