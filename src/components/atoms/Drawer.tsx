import { ReactNode, useEffect } from 'react'
import { TABLET_MIN_WIDTH } from 'src/models/constants'
import styled from 'styled-components'

const Transition = styled.div`
  > div {
    transition: background 0.3s ease-out;
  }

  > section {
    transition: 0.3s ease-in-out;
  }
`

const DrawerInput = styled.input`
  display: none;

  :checked ~ div {
    position: fixed;
    inset: 0 0 0 50%;
    width: 100%;
    max-width: ${TABLET_MIN_WIDTH};
    transform: translateX(-50%);
    background: #00000080;
  }

  :checked ~ section {
    bottom: 0;
  }
`

const DrawerBackground = styled.div`
  background: #00000000;
  z-index: 8;
`

const DrawerSection = styled.section`
  position: fixed;
  bottom: -33vh;
  left: 50%;
  z-index: 9;

  width: 100%;
  max-width: ${TABLET_MIN_WIDTH};
  transform: translateX(-50%);
  height: 33vh;

  padding: 20px 1rem 1rem;
  background: #fff;
  border-radius: 20px 20px 0px 0px;
`

type Props = {
  children: ReactNode
  open: boolean
  setOpen: (e: boolean) => void
}

function Drawer({ children, open, setOpen }: Props) {
  function closeDrawer() {
    setOpen(false)
  }

  useEffect(() => {
    function closeOnEscapeKey(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        setOpen(false)
      }
    }

    const bodyStyle = document.body.style
    const scrollY = window.scrollY

    if (open) {
      document.addEventListener('keydown', closeOnEscapeKey, false)
      bodyStyle.overflow = 'hidden'
      bodyStyle.position = 'fixed'
      bodyStyle.top = `-${scrollY}px`
    }

    return () => {
      document.removeEventListener('keydown', closeOnEscapeKey, false)
      bodyStyle.overflow = ''
      bodyStyle.position = ''
      bodyStyle.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [open, setOpen])

  return (
    <Transition>
      <DrawerInput checked={open} type="checkbox" />
      <DrawerBackground onClick={closeDrawer} />
      <DrawerSection>{children}</DrawerSection>
    </Transition>
  )
}

export default Drawer
