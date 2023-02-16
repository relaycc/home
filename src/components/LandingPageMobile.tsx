import { FunctionComponent } from "preact/compat";
import Head from "next/head";
import styled from "styled-components";
import * as Nav from "@/design/relay/Nav";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { RobotTitleLogo } from "@/design/robot/robotTitleLogo";
import Footer from "@/design/relay/Footer";
import { RobotLogo } from "@/design/robot/RobotLogo";
import { usePriorityRobotCards } from "@/hooks/usePriorityRobotCards";
import * as Card from "@/design/relay/Card";
import {
  ButtonPrimaryMd,
  ButtonSecondaryMd,
} from "@/design/robot/RobotButtonView";
import * as MenuMobile from "@/design/relay/MenuMobile";
import { RobotHeadMobile } from "@/design/robot/RobotHeadMobile";
import MobileMenuComponent from "@/components/MobileMenuComponent";
import { motion } from "framer-motion";
import { ArrowDownWhite } from "@/design/robot/ArrowDownWhite";
import { ArrowUpWhite } from "@/design/robot/ArrowUpWhite";

const Root = styled.div`
  font-family: "Satoshi-Regular";
  @media (min-width: 651px) {
    display: none;
  }
`;
const RelayLanding: FunctionComponent = () => {
  const router = useRouter();
  const [showCommunity, setShowCommunity] = useState(false);
  const toggleCommunity = useCallback(() => {
    setShowCommunity(!showCommunity);
  }, [showCommunity]);
  const [showMenu, setShowMenu] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const toggleShowMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);
  const toggleShowMore = useCallback(() => {
    setShowMore(!showMore);
  }, [showMore]);
  const robotCards = usePriorityRobotCards(true);
  return (
    <Root>
      <Head>
        <title>Relay</title>
        <meta name="description" content="the Relay App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FullWidthPage>
        <ContentColumn>
          <Nav.RootMobile>
            <RobotLogo />
            <RobotTitleLogo />
            <MenuMobile.MenuIcon onClick={toggleShowMenu} stroke={"#FFFFFF"} />
          </Nav.RootMobile>

          <MobileTitelWrapper>
            <TitleWhite>Web3 Agent for</TitleWhite>
            <TitleGradient>User Onboarding</TitleGradient>

            <SubTitle>Train your own Ethereum-enabled ChatGPT bot</SubTitle>
            <ButtonsWrapper>
              <ButtonWrapper>
                <ButtonSecondaryMd>Join Waitlist</ButtonSecondaryMd>
              </ButtonWrapper>
              <ButtonWrapper>
                <ButtonPrimaryMd>Try Robot</ButtonPrimaryMd>
              </ButtonWrapper>
            </ButtonsWrapper>
            <ImageWrapper>
              <RobotHeadMobile />
            </ImageWrapper>
            <RobotTitle>Click your favorite dApp to try Robot!</RobotTitle>
            {/*<Ellipse />*/}
          </MobileTitelWrapper>
          <Wrapper>
            <CardGrid height={showMore ? "100%" : "15rem"}>
              {robotCards.map((robot, i) => (
                <Card.Card
                  key={robot.peerAddress}
                  handleClick={() => {
                    console.log(robot);
                  }}
                  icon={<robot.icon width={82} />}
                  initialBgColor={robot.initialBgColor}
                  animateBgColor={robot.animateBgColor}
                  isMobile={true}
                />
              ))}
            </CardGrid>
            <ShowMoreWrapper showMore={showMore}>
              <ShowMoreButton onClick={toggleShowMore}>
                {showMore ? "Show Less" : "Show More"}
                {showMore ? <ArrowUpWhite /> : <ArrowDownWhite />}
              </ShowMoreButton>
            </ShowMoreWrapper>
          </Wrapper>
        </ContentColumn>

        {showMenu && <MobileMenuComponent setShowMenu={setShowMenu} />}

        <Footer
          onClickReceiver={() => {}}
          onClickRecon={() => {}}
          onClickRobot={() => {}}
        />
      </FullWidthPage>
    </Root>
  );
};
const Wrapper = styled.div`
  max-height: fit-content;
  align-items: center;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const FullWidthPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: #0c063c;
`;
const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: calc(252px * 5 + 64px);
  flex-grow: 1;
`;

const CardGrid = styled(motion.div)<{ height?: string }>`
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  height: auto;
  padding: 0 1rem;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 160px);
  max-height: ${(p) => p.height};
  overflow: hidden;
  background: radial-gradient(
    100% 100% at 50% 0%,
    rgba(12, 6, 60, 0) 0%,
    #0c063c 100%
  );
`;
const ShowMoreWrapper = styled.div<{ showMore: boolean }>`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  bottom: ${(p) => (p.showMore ? "" : "4.5rem")};
  left: 0px;
  margin-top: ${(p) => (p.showMore ? "1rem" : "")};

  height: ${(p) => (p.showMore ? "fit-conent" : "5rem")};
  background: ${(p) =>
    p.showMore
      ? ""
      : "radial-gradient(100% 100% at 50% 0%,rgba(12, 6, 60, 0) 0%,#0c063c 100%)"};
`;
const ShowMoreButton = styled.div`
  position: relative;
  display: flex;
  height: 40px;
  width: 136px;
  border-radius: 8px;
  padding: 10px 16px 10px 16px;
  z-index: 1;
  border: 1px solid #4236c7;
  background: #4236c7;
  align-items: center;
  justify-content: space-between;
  color: white;
`;
const MobileTitelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: max-content;
`;
const TitleWhite = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 34px;
  color: #ffffff;
`;
const TitleGradient = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 34px;
  padding: 0rem 1.5rem;
  background-image: linear-gradient(
    89.58deg,
    #a979e9 2.36%,
    #849dfd 15.63%,
    #73b9ff 28.9%,
    #85cff8 42.16%,
    #ade1f0 55.43%,
    #dbeff0 68.69%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const SubTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  //margin-top: 1rem;

  color: #dad8f6;
`;
const RobotTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  //margin-bottom: 1rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 19rem;
`;
const ButtonWrapper = styled.div`
  width: 9.25rem;
  padding: 2px;
  background: linear-gradient(83.91deg, #4236c7 0%, #9747ff 100%);
  border-radius: 8.4px;
  margin-top: 3.25rem;
  margin-bottom: 2rem;
`;

const ImageWrapper = styled.div`
  width: 300px;
  height: 285px;
`;

export default RelayLanding;
