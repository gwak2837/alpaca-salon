import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { PrimaryButton } from 'src/components/atoms/Button'
import PageHead from 'src/components/PageHead'
import { useUserByNameQuery } from 'src/graphql/generated/types-and-hooks'
import NavigationLayout from 'src/layouts/NavigationLayout'
import {
  ALPACA_SALON_BACKGROUND_COLOR,
  ALPACA_SALON_COLOR,
  NAVIGATION_HEIGHT,
} from 'src/models/constants'
import HeartIcon from 'src/svgs/HeartIcon'
import { getUserUniqueName } from 'src/utils'
import styled from 'styled-components'

const FlexContainerHeight100 = styled.div`
  display: flex;
  flex-flow: column;
  height: calc(100vh - ${NAVIGATION_HEIGHT});

  > :last-child {
    flex-grow: 1;
  }
`

const PageTitle = styled.h2`
  margin: 0.5rem;
`

const GridContainer2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr 1fr;
  grid-template-rows: 0.5fr 1fr;

  > span {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    width: 100%; // for safari
    cursor: pointer;
  }
`

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  padding: 0.5rem;

  position: sticky;
  bottom: 0;
`

const Wrapper = styled.div`
  width: 1.4rem;
  display: flex;
  align-items: center;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  width: fit-content;
  margin: 0 auto;
  padding: 1rem;
  background: ${ALPACA_SALON_BACKGROUND_COLOR};
  border-radius: 20px;
`

const FlexContainerEnd = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const Nickname = styled.h2`
  margin: 1rem;
  text-align: center;
`

const PrimaryColorText = styled.h4`
  color: ${ALPACA_SALON_COLOR};
`

const description = '알파카의 정보를 알아보세요'
export default function UserPage() {
  const router = useRouter()
  const userUniqueName = getUserUniqueName(router)

  const { data } = useUserByNameQuery({
    skip: !userUniqueName,
    variables: { uniqueName: userUniqueName },
  })

  const user = data?.userByName

  return (
    <PageHead title={`@${userUniqueName} - 알파카살롱`} description={description}>
      <FlexContainerHeight100>
        <div>
          <PageTitle>마이페이지</PageTitle>

          <GridContainer2>
            <Image
              src={user?.imageUrl ?? '/images/default-profile-image.webp'}
              alt="profile-image"
              width="200"
              height="200"
            />
          </GridContainer2>

          <Nickname>{user?.nickname ?? '닉네임'}</Nickname>

          <FlexContainer>
            <Wrapper>
              <HeartIcon selected />
            </Wrapper>
            받은 공감 개수
            <PrimaryColorText>{user?.likedCount}</PrimaryColorText>
          </FlexContainer>
          <div>사용자 아이디: {userUniqueName}</div>
        </div>

        <FlexContainerEnd>
          <GridContainer>
            <PrimaryButton>로그아웃</PrimaryButton>
            <PrimaryButton disabled>회원탈퇴</PrimaryButton>
          </GridContainer>
        </FlexContainerEnd>
      </FlexContainerHeight100>
    </PageHead>
  )
}

UserPage.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>
}
