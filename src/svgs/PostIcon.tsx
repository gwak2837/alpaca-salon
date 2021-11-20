import { ALPACA_SALON_ACHROMATIC_COLOR, ALPACA_SALON_COLOR } from 'src/models/constants'

type Props = {
  selected?: boolean
}

function PostIcon({ selected }: Props) {
  return (
    <svg viewBox="0 0 20 18" fill="none">
      <path
        d="M4.188 2.39h11.625A.188.188 0 0016 2.204V.891a.188.188 0 00-.188-.188H4.188A.188.188 0 004 .891v1.312c0 .103.084.188.188.188zm11.625 9.938a.188.188 0 00.187-.187v-1.313a.188.188 0 00-.188-.187H4.188a.188.188 0 00-.188.187v1.313c0 .103.084.187.188.187h11.625zm3.374 3.281H.813a.188.188 0 00-.187.188v1.312c0 .103.084.188.188.188h18.375a.188.188 0 00.187-.188v-1.312a.188.188 0 00-.188-.188zm0-9.937H.813a.188.188 0 00-.187.187v1.313c0 .103.084.187.188.187h18.375a.188.188 0 00.187-.187V5.859a.188.188 0 00-.188-.187z"
        fill={selected ? ALPACA_SALON_COLOR : ALPACA_SALON_ACHROMATIC_COLOR}
      />
    </svg>
  )
}

export default PostIcon
