import { FunctionComponent } from "preact/compat";
import { NextRouter, useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePriorityRobotCards } from "@/hooks/usePriorityRobotCards";
import Head from "next/head";
import * as Nav from "@/design/relay/Nav";
import * as Card from "@/design/relay/Card";

import { RobotLogo } from "@/design/robot/RobotLogo";
import { RobotTitleLogo } from "@/design/robot/robotTitleLogo";
import { ConnectButton } from "@/components/ConnectButton";
import {
  ButtonPrimaryMd,
  ButtonSecondaryMd,
} from "@/design/robot/RobotButtonView";
import { RobotHead } from "@/design/robot/RobotHead";
import Footer from "@/design/relay/Footer";
import { DropdownItem } from "@/design/relay/DropdownItem";
import styled from "styled-components";
import { IconGithub } from "@/design/relay/IconGithub";

const Root = styled.div`
  @media (max-width: 650px) {
    display: none;
  }
`;
const LandingPage: FunctionComponent = () => {
  const router = useRouter();
  const [showCommunity, setShowCommunity] = useState(false);
  const toggleCommunity = useCallback(() => {
    setShowCommunity(!showCommunity);
  }, [showCommunity]);
  const [showMenu, setShowMenu] = useState(false);
  const toggleShowMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);
  const robotCards = usePriorityRobotCards();

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
          <Nav.RootDesktop>
            <Nav.Left>
              <RobotLogo />
            </Nav.Left>
            <Nav.Middle>
              <RobotTitleLogo />
            </Nav.Middle>
            <Nav.Right>
              <GitIconWrapper>
                <IconGithub />
              </GitIconWrapper>
              {showCommunity ? (
                <CommunityDropdown
                  toggleDropdown={toggleCommunity}
                  router={router}
                />
              ) : (
                <Nav.NavLink onClick={toggleCommunity}>
                  Community
                  <Nav.ChevronDownColored />
                </Nav.NavLink>
              )}
              <Nav.LogoAndNameWrapper>
                <ConnectButton />
              </Nav.LogoAndNameWrapper>
            </Nav.Right>
          </Nav.RootDesktop>

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
            <RobotHead />
            {/*<Ellipse />*/}
          </MobileTitelWrapper>
          <CardTitle>Click your favorite dApp to try Robot!</CardTitle>
          <CardGrid>
            {robotCards.map((robot, i) => (
              <Card.Card
                key={robot.peerAddress}
                handleClick={() => {
                  console.log("Show bot");
                }}
                icon={<robot.icon />}
                initialBgColor={robot.initialBgColor}
                animateBgColor={robot.animateBgColor}
              />
            ))}
          </CardGrid>
        </ContentColumn>
        <Footer
          onClickReceiver={() => {}}
          onClickRecon={() => {}}
          onClickRobot={() => {}}
        />
      </FullWidthPage>
    </Root>
  );
};
const CommunityDropdown: FunctionComponent<{
  toggleDropdown: () => void;
  router: NextRouter;
}> = ({ toggleDropdown, router }) => {
  const handleNav = useCallback(
    (url: string) => {
      router.push(url);
    },
    [router]
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleDropdown();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref, toggleDropdown]);
  // TODO Use handle nav with appropriate links
  return (
    <CommunityRoot ref={ref}>
      <Nav.NavLink onClick={toggleDropdown}>
        Community <Nav.ChevronDownColored />
      </Nav.NavLink>
      <CommunityCard>
        <DropdownItem
          as="a"
          href="https://discord.gg/relaycc"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </DropdownItem>
        <DropdownItem
          as="a"
          href="https://twitter.com/relay_eth"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </DropdownItem>
        <DropdownItem
          as="a"
          href="https://lenster.xyz/u/relay"
          target="_blank"
          rel="noreferrer"
        >
          Lens
        </DropdownItem>
        <DropdownItem
          as="a"
          href="https://mirror.xyz/relaycc.eth"
          target="_blank"
          rel="noreferrer"
        >
          Mirror
        </DropdownItem>
      </CommunityCard>
    </CommunityRoot>
  );
};

const FullWidthPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  background: #0c063c;
  //background: deeppink;
`;
const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: calc(252px * 5 + 64px);
  flex-grow: 1;
`;
const CommunityRoot = styled.div`
  position: relative;
`;
const CommunityCard = styled(Nav.DropdownCard)`
  position: absolute;
  left: -17px;
  z-index: 1;
`;
const CardGrid = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  width: 100%;
  max-width: 1344px;
  height: auto;
  padding: 0 1rem;
  grid-template-columns: initial;
  grid-gap: 0.5rem;
  //margin-top: 4rem;
  margin: 4rem 5.5rem;
  @media screen and (min-width: 400px) {
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(350px, 350px));
    padding: 0 2rem;
  }

  @media screen and (min-width: 1400px) {
    padding: 0;
  }
`;
const CardTitle = styled.div`
  font-weight: 700;
  font-size: 48px;
  color: white;
  margin-top: 3rem;
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
  font-size: 72px;
  color: #ffffff;
`;
const TitleGradient = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 72px;
  padding: 0rem 1.5rem;
  margin-top: 0.75rem;

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
  font-size: 21px;
  margin-top: 2rem;
  color: #dad8f6;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 19rem;
  margin-top: 3.25rem;
  margin-bottom: 2rem;
`;
const ButtonWrapper = styled.div`
  width: 9.25rem;
  padding: 2px;
  background: linear-gradient(83.91deg, #4236c7 0%, #9747ff 100%);
  border-radius: 8.4px;
`;
const GitIconWrapper = styled.div`
  cursor: pointer;
`;
export default LandingPage;
