import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { FooterBackground } from "@/design/relay/FooterBackground";
import { FooterLink } from "@/design/relay/FooterLink";
import * as Logo from "@/design/relay/Logo";
import * as LogoSocialMedia from "@/design/relay/LogoSocialMedia";

export const Root = styled.div`
  display: flex;
  justify-content: center;
  height: 23.438rem;
  background-image: url("/footer-bg.png");
  background-position: center;
  width: 100%;
  overflow-x: hidden;
`;

export const StyledBckgr = styled(FooterBackground)`
  width: 100%;
  justify-self: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 23.438rem;
  width: 100%;
  max-width: 1440px;
  padding: 2rem 2rem 1rem 2rem;

  @media screen and (min-width: 625px) {
    padding: 3rem;
  }
`;

export const LinkContainer = styled.div`
  display: grid;
  grid-template-areas:
    "products resources"
    "products about"
    "community community";
  grid-row-gap: 1rem;
  justify-content: space-between;
  height: 100%;

  @media screen and (min-width: 625px) {
    height: 13.188rem;
    grid-template-areas: "products resources about community";
  }
`;

export const LinkColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.75rem;

  @media screen and (min-width: 625px) {
    row-gap: 1rem;
  }
`;

const LinkColumnProducts = styled(LinkColumn)`
  grid-area: products;
`;

const LinkColumnResources = styled(LinkColumn)`
  grid-area: resources;
`;

const LinkColumnAbout = styled(LinkColumn)`
  grid-area: about;
`;

const LinkColumnCommunity = styled(LinkColumn)`
  margin-top: 1.25rem;
  grid-area: community;

  @media screen and (min-width: 625px) {
    margin-top: 0;
  }
`;

export const CommunityLinkItems = styled(LinkColumn)`
  row-gap: 1rem;
  flex-direction: row;
  justify-content: center;
  ${LogoSocialMedia.Logowrap} {
    width: 3.5rem;
  }

  @media screen and (min-width: 625px) {
    flex-direction: column;
    row-gap: 0;

    ${LogoSocialMedia.Logowrap} {
      width: 7rem;
    }
  }
`;

export const LinkTitle = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 20px;
  line-height: 27px;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const LinkTitleCommunity = styled(LinkTitle)`
  display: none;

  @media screen and (min-width: 625px) {
    display: block;
  }
`;

export const SignOff = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${receiverTheme.colors.gray["500"]};
  min-height: 3.6875rem;
  margin-top: 1.25rem;

  ${Logo.Logowrap} {
    height: initial;
  }

  @media screen and (min-width: 625px) {
    margin-top: 1.5rem;
    min-height: 5.75rem;

    ${Logo.Logowrap} {
      height: 2.75rem;
    }
  }
`;
export const Copyright = styled.div`
  font-style: normal;
  font-weight: 900;
  color: #ffffff;
  font-size: 16px;
  line-height: 21.6px;

  @media screen and (min-width: 625px) {
    font-size: 20px;
    line-height: 27px;
  }
`;

const Label = styled(LogoSocialMedia.Label)`
  display: none;

  @media screen and (min-width: 625px) {
    display: block;
  }
`;

export default function Footer({
  onClickReceiver,
  onClickRecon,
  onClickRobot,
}: {
  onClickReceiver: () => unknown;
  onClickRecon: () => unknown;
  onClickRobot: () => unknown;
}) {
  return (
    <Root>
      <Wrapper>
        <LinkContainer>
          <LinkColumnProducts>
            <LinkTitle>Products</LinkTitle>
            <FooterLink onClick={onClickReceiver}>Receiver</FooterLink>
            <FooterLink onClick={onClickRecon}>Recon</FooterLink>
            <FooterLink onClick={onClickRobot}>Robot</FooterLink>
          </LinkColumnProducts>
          <LinkColumnResources>
            <LinkTitle>Resources</LinkTitle>
            <FooterLink href="https://xmtp.org/docs/dev-concepts/introduction">
              XMTP
            </FooterLink>
            <FooterLink
              href="https://docs.relay.cc/about"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </FooterLink>
          </LinkColumnResources>
          <LinkColumnAbout>
            <LinkTitle>About</LinkTitle>
            <FooterLink
              href="https://jobs.lever.co/relay"
              target="_blank"
              rel="noreferrer"
            >
              Careers
            </FooterLink>
          </LinkColumnAbout>
          <LinkColumnCommunity>
            <LinkTitleCommunity>Join the Community</LinkTitleCommunity>
            <CommunityLinkItems>
              <LogoSocialMedia.Logowrap
                as="a"
                href="https://discord.gg/relaycc"
                target="_blank"
                rel="noreferrer"
              >
                <LogoSocialMedia.Discord />
                <Label>Discord</Label>
              </LogoSocialMedia.Logowrap>
              <LogoSocialMedia.Logowrap
                as="a"
                href="https://twitter.com/relay_eth"
                target="_blank"
                rel="noreferrer"
              >
                <LogoSocialMedia.Twitter />
                <Label>Twitter</Label>
              </LogoSocialMedia.Logowrap>
              <LogoSocialMedia.Logowrap
                as="a"
                href="https://github.com/relaycc"
                target="_blank"
                rel="noreferrer"
              >
                <LogoSocialMedia.Github />
                <Label>Github</Label>
              </LogoSocialMedia.Logowrap>
              <LogoSocialMedia.Logowrap
                as="a"
                href="https://mirror.xyz/relaycc.eth"
                target="_blank"
                rel="noreferrer"
              >
                <LogoSocialMedia.Mirror />
                <Label>Mirror</Label>
              </LogoSocialMedia.Logowrap>
            </CommunityLinkItems>
          </LinkColumnCommunity>
        </LinkContainer>
        <SignOff>
          <a href="https://relay.cc">
            <Logo.Logowrap>
              <Logo.LogomarkWhite />
              <Logo.LogotypeWhite />
            </Logo.Logowrap>
          </a>
          <Copyright>Copyright © 2022</Copyright>
        </SignOff>
      </Wrapper>
    </Root>
  );
}
