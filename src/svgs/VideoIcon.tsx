import { ALPACA_SALON_ACHROMATIC_COLOR, ALPACA_SALON_COLOR } from 'src/models/constants'

type Props = {
  selected?: boolean
}

function VideoIcon({ selected }: Props) {
  return (
    <svg viewBox="0 0 22 10" fill="none">
      <path
        d="M.984.506v6.74C.99 8.77 2.345 9.996 3.998 9.991h10.693c.303 0 .549-.225.549-.498v-6.74C15.232 1.23 13.877.003 12.226.009H1.531c-.302 0-.547.224-.547.497zm14.936 2.63L20.336.173c.383-.292.68-.219.68.309v9.036c0 .601-.363.528-.68.309L15.92 6.87V3.136z"
        fill={selected ? ALPACA_SALON_COLOR : ALPACA_SALON_ACHROMATIC_COLOR}
      />
    </svg>
  )
}

export default VideoIcon
