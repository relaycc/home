import Head from "next/head";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import * as Card from "@/design/relay/Card";
import * as DirectoryHeader from "@/design/relay/DirectoryHeader";
import Footer from "@/design/relay/Footer";
import { DirectoryCard } from "@/design/relay/DirectoryCard";
import { Logo } from "@/design/relay/Logo";
import { IconGithub } from "@/design/relay/IconGithub";
import * as Nav from "@/design/relay/Nav";
import * as Showcase from "@/design/relay/Showcase";
import { client } from "@/lib/supabase/client";
import {
  isProject,
  Project,
  CATEGORIES,
  ProjectCategory,
  isProjectCategory,
  categoryToDisplay,
} from "@/lib/supabase/project";
import * as MenuMobile from "@/design/relay/MenuMobile";
import { ConnectButton } from "@/components/ConnectButton";
import { NextRouter, useRouter } from "next/router";
import { ReceiverWindow } from "@/components/ReceiverWindow";
import { useGoToDm, useGoToMessages } from "@/hooks/useReceiverWindow";
import { DropdownItem } from "@/design/relay/DropdownItem";
import { Sidebar } from "@/design/relay/Sidebar";
import { useShowcaseClick } from "@/lib/plausible/useShowcaseClick";
import * as Chevron from "@/design/relay/Chevron";
import { usePriorityRobotCards } from "@/hooks/usePriorityRobotCards";
import { EthAddress, isEthAddress } from "@relaycc/xmtp-hooks";
import { isEnsName } from "@/lib/isEnsName";
import { fetchAddressFromEns } from "@/hooks/useAddressFromEns";
import { useAnimation } from "framer-motion";
import { ChatIconBlack } from "@/design/relay/ChatIcon";
import { CloseIcon } from "@/design/NewMessageHeader";
import { MobileLogo } from "@/design/MobileLogo";
import MobileMenuComponent from "@/components/MobileMenuComponent";

const translateXForElement = (element: HTMLDivElement) => {
  const transform = element.style.transform;

  if (!transform || transform.indexOf("translateX(") < 0) {
    return 0;
  }

  const extractTranslateX = transform.match(/translateX\((-?\d+)/);

  return extractTranslateX && extractTranslateX.length === 2
    ? parseInt(extractTranslateX[1], 10)
    : 0;
};

export default function Relay({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const goToDm = useGoToDm();
  const goToMessages = useGoToMessages();
  const robotCards = usePriorityRobotCards();
  const queryCategory = (() => {
    if (!isProjectCategory(router.query.category)) {
      return null;
    } else {
      return router.query.category;
    }
  })();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>(
    queryCategory || "general"
  );
  const [width, setWidth] = useState(0);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const showcaseHeaderRef = useRef<HTMLDivElement>(null);

  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [messageInputIsError, setMessageInputIsError] = useState(false);
  const [messageInputIsLoading, setMessageInputIsLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState<boolean>(false);
  const [showCommunity, setShowCommunity] = useState(false);
  const toggleCommunity = useCallback(() => {
    setShowCommunity(!showCommunity);
  }, [showCommunity]);
  const toggleMobileSearch = useCallback(() => {
    setShowMobileSearch(!showMobileSearch);
  }, [showMobileSearch]);
  const toggleShowMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);
  const [sidebar, setSidebar] = useState<boolean>(false);
  const [showCaseDragging, setShowCaseDragging] = useState<boolean>(false);
  const showcaseDragStop = useCallback(
    () => setTimeout(() => setShowCaseDragging(false), 200),
    []
  );
  const showCaseDragStart = useCallback(() => {
    setShowCaseDragging(true);
  }, []);
  const showcaseClick = useShowcaseClick();
  const directoryRef = useRef<HTMLDivElement>(null);
  const animation = useAnimation();
  const dragRef = useRef<HTMLDivElement>(null);

  const onLeftClick = useCallback(() => {
    if (!dragRef?.current) {
      return;
    }
    const x = translateXForElement(dragRef.current);
    const newXPosition = x - scrollAmount(true);

    animation.start({
      x: newXPosition > 0 ? 0 : newXPosition,
    });
  }, []);

  const onRightClick = useCallback(() => {
    if (!dragRef?.current) {
      return;
    }
    const x = translateXForElement(dragRef.current);
    const newXPosition = x - scrollAmount(false);

    animation.start({
      x: newXPosition < -width ? -width : newXPosition,
    });
  }, [width]);

  const scrollToShowcaseHeader = useCallback(() => {
    if (showcaseHeaderRef.current === null) {
      return;
    } else {
      showcaseHeaderRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showcaseHeaderRef]);

  const scrollToDirectory = useCallback(() => {
    if (directoryRef.current === null) {
      return;
    } else {
      directoryRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [directoryRef]);

  useEffect(() => {
    if (queryCategory === null) {
      return;
    } else {
      scrollToDirectory();
    }
  }, [queryCategory, scrollToDirectory]);

  useEffect(() => {
    showcaseRef?.current &&
      setWidth(
        showcaseRef.current.scrollWidth - showcaseRef.current.offsetWidth
      );
  }, []);

  const filteredProjects = projects.filter((project) => {
    return (
      project.category === activeCategory &&
      (() => {
        if (searchInput === null) {
          return true;
        } else {
          return project.name.toLowerCase().includes(searchInput.toLowerCase());
        }
      })()
    );
  });

  const scrollAmount = useCallback(
    (left?: boolean) => {
      if (left && showcaseRef && showcaseRef.current) {
        return -showcaseRef.current.clientWidth - 14;
      } else if (showcaseRef && showcaseRef.current) {
        return showcaseRef.current.clientWidth + 14;
      }
      if (left) {
        return -270;
      }
      return 270;
    },
    [window]
  );

  const scrollRight = useCallback(() => {
    showcaseRef?.current?.scrollBy({
      left: scrollAmount(),
      behavior: "smooth",
    });
  }, []);
  const scrollLeft = useCallback(() => {
    showcaseRef?.current?.scrollBy({
      left: scrollAmount(true),
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Relay</title>
        <meta name="description" content="the Relay App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FullWidthPage>
        <ContentColumn>
          <Nav.RootDesktop>
            <Logo />
            <Nav.Message
              isError={messageInputIsError}
              isLoading={messageInputIsLoading}
              placeholder={"Message ENS, Lens, or 0xAddress"}
              onChange={(e: any) => {
                setMessageInputIsError(false);
              }}
              onKeyPress={async (e: any) => {
                if (e.key === "Enter") {
                  if (
                    !isEnsName(e.currentTarget.value) &&
                    !isEthAddress(e.currentTarget.value)
                  ) {
                    setMessageInputIsError(true);
                  } else {
                    if (isEnsName(e.currentTarget.value)) {
                      setMessageInputIsLoading(true);
                      const address = await fetchAddressFromEns(
                        e.currentTarget.value
                      );
                      setMessageInputIsLoading(false);
                      if (typeof address === "string") {
                        goToDm({ peerAddress: address as EthAddress });
                        setMessageInputIsError(false);
                      } else {
                        setMessageInputIsError(true);
                      }
                    } else {
                      goToDm({ peerAddress: e.currentTarget.value });
                      setMessageInputIsError(false);
                    }
                  }
                }
              }}
            />
            <Nav.NavLink
              as="a"
              href="https://airtable.com/shrD6Xv70iq7WDwoj"
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: "auto", marginRight: "1.5rem" }}
            >
              Waitlist
            </Nav.NavLink>
            {showCommunity ? (
              <CommunityDropdown
                toggleDropdown={toggleCommunity}
                router={router}
              />
            ) : (
              <Nav.NavLink onClick={toggleCommunity}>
                Community
                <Nav.ChevronDownActive />
              </Nav.NavLink>
            )}

            <Nav.LogoAndNameWrapper>
              <a
                href="https://github.com/relaycc"
                target="_blank"
                rel="noreferrer"
              >
                <IconGithub
                  style={{ height: "2rem", width: "2rem", margin: "1.5rem" }}
                />
              </a>
              <ConnectButton />
            </Nav.LogoAndNameWrapper>
            <Nav.MobileMenuButtonWrapper>
              <MenuMobile.MenuIcon onClick={toggleShowMenu} />
            </Nav.MobileMenuButtonWrapper>
          </Nav.RootDesktop>
          <Nav.RootMobile>
            {showMobileSearch ? (
              <>
                <Nav.Message
                  isError={messageInputIsError}
                  isLoading={messageInputIsLoading}
                  placeholder={"Message ENS, Lens, or 0xAddress"}
                  onChange={(e: any) => {
                    setMessageInputIsError(false);
                  }}
                  style={{ margin: "0" }}
                  onKeyPress={async (e: any) => {
                    if (e.key === "Enter") {
                      if (
                        !isEnsName(e.currentTarget.value) &&
                        !isEthAddress(e.currentTarget.value)
                      ) {
                        setMessageInputIsError(true);
                      } else {
                        if (isEnsName(e.currentTarget.value)) {
                          setMessageInputIsLoading(true);
                          const address = await fetchAddressFromEns(
                            e.currentTarget.value
                          );
                          setMessageInputIsLoading(false);
                          if (typeof address === "string") {
                            goToDm({ peerAddress: address as EthAddress });
                            setMessageInputIsError(false);
                          } else {
                            setMessageInputIsError(true);
                          }
                        } else {
                          goToDm({ peerAddress: e.currentTarget.value });
                          setMessageInputIsError(false);
                        }
                      }
                    }
                  }}
                />
                <CloseIcon onClick={toggleMobileSearch} />
              </>
            ) : (
              <>
                <MobileLogo />
                <MenuMobile.RightWrapper>
                  <ChatIconBlack onClick={toggleMobileSearch} />
                  <MenuMobile.MenuIcon onClick={toggleShowMenu} />
                </MenuMobile.RightWrapper>
              </>
            )}
          </Nav.RootMobile>
          <DirectoryHeader.Root
            ref={showcaseHeaderRef}
            style={{ maxWidth: "max-content", marginTop: "3rem" }}
          >
            <DirectoryHeader.Title>Try ChatGPT for Web3</DirectoryHeader.Title>
          </DirectoryHeader.Root>
          <Showcase.Wrapper>
            <Showcase.InnerWrapper>
              <Showcase.Root>
                <Chevron.ChevronLeftActive onClick={onLeftClick} />
                <Showcase.MotionRoot ref={showcaseRef}>
                  <Showcase.Slides
                    drag="x"
                    ref={dragRef}
                    dragConstraints={{ right: 0, left: -width }}
                    onDragStart={showCaseDragStart}
                    animate={animation}
                    transition={{
                      type: "spring",
                      stiffness: 40,
                    }}
                    onDragEnd={showcaseDragStop}
                  >
                    {robotCards.map((robot, i) => (
                      <Card.Card
                        key={robot.peerAddress}
                        handleClick={() => {
                          if (!showCaseDragging) {
                            showcaseClick(robot.peerAddress);
                            goToDm({
                              peerAddress: robot.peerAddress as EthAddress,
                            });
                          }
                        }}
                        icon={<robot.icon />}
                        initialBgColor={robot.initialBgColor}
                        animateBgColor={robot.animateBgColor}
                      />
                    ))}
                  </Showcase.Slides>
                </Showcase.MotionRoot>
                <Chevron.ChevronRightActive onClick={onRightClick} />
              </Showcase.Root>
              <Showcase.Ellipse />
            </Showcase.InnerWrapper>
          </Showcase.Wrapper>
          <DirectoryHeader.DirectoryRoot>
            <DirectoryHeader.Title
              ref={directoryRef}
              style={{ marginTop: "4rem" }}
            >
              Explore Web3 on Relay
            </DirectoryHeader.Title>
            <DirectoryHeader.Search.Search
              onChange={(e: any) => {
                setSearchInput(e.target.value);
              }}
              value={searchInput || ""}
              placeholder={"Search for projects..."}
            />
            <DirectoryHeader.Nav>
              <DirectoryHeader.Directories>
                {CATEGORIES.map((category) => {
                  return (
                    <DirectoryHeaderItem
                      key={category}
                      category={category}
                      isActive={category === activeCategory}
                      onClick={() => setActiveCategory(category)}
                    />
                  );
                })}
              </DirectoryHeader.Directories>
            </DirectoryHeader.Nav>
          </DirectoryHeader.DirectoryRoot>
          <DirectoryHeader.MobileRoot style={{ maxWidth: "100%" }}>
            <DirectoryHeader.Title>Directory</DirectoryHeader.Title>
            <DirectoryHeader.SearchWrapper>
              <DirectoryHeader.Search.Search
                onChange={(e: any) => {
                  setSearchInput(e.target.value);
                }}
                value={searchInput || ""}
                placeholder={"Search for projects..."}
              />
              <DirectoryHeader.MenuIcon onClick={() => setSidebar(true)} />
            </DirectoryHeader.SearchWrapper>
            <DirectoryHeader.CategoryWrapper>
              <DirectoryHeader.CategoryTitle>
                Category:
              </DirectoryHeader.CategoryTitle>
              <DirectoryHeader.ActiveCategoryTitle>
                {activeCategory}
              </DirectoryHeader.ActiveCategoryTitle>
            </DirectoryHeader.CategoryWrapper>
            <DirectoryHeader.Nav>
              <DirectoryHeader.Directories>
                {CATEGORIES.map((category) => {
                  return (
                    <DirectoryHeaderItem
                      key={category}
                      category={category}
                      isActive={category === activeCategory}
                      onClick={() => setActiveCategory(category)}
                    />
                  );
                })}
              </DirectoryHeader.Directories>
            </DirectoryHeader.Nav>
          </DirectoryHeader.MobileRoot>
          <ContentColumnNarrow style={{ minHeight: "100vh" }}>
            <FlexWrapRow>
              {filteredProjects.map((project, i) => (
                <DirectoryCard
                  url={project.url}
                  name={project.name}
                  delay={i * 0.05}
                  key={project.name + project.category}
                  logo={project.logo}
                  description={project.description}
                  category={activeCategory}
                  handle={project.handle}
                />
              ))}
            </FlexWrapRow>
          </ContentColumnNarrow>
        </ContentColumn>
        <Footer
          onClickReceiver={goToMessages}
          onClickRecon={scrollToDirectory}
          onClickRobot={scrollToShowcaseHeader}
        />
        {showMenu && <MobileMenuComponent setShowMenu={setShowMenu} />}
        <ReceiverWindow />
        <Sidebar
          {...{ sidebar, setSidebar, activeCategory, setActiveCategory }}
        />
      </FullWidthPage>
    </>
  );
}

export const getServerSideProps = async (): Promise<{
  props: {
    projects: Project[];
  };
}> => {
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("sort", { ascending: true });

  const processed = (() => {
    if (data === null) {
      console.warn('Data fetched for projects is null, returning empty array"');
      return [];
    } else if (error !== null) {
      console.error("Error fetching projects", error);
      return [];
    } else {
      return data.filter(isProject);
    }
  })();

  return {
    props: {
      projects: processed,
    },
  };
};

const DirectoryHeaderItem = ({
  isActive,
  onClick,
  category,
}: {
  isActive: boolean;
  onClick: () => unknown;
  category: ProjectCategory;
}) => {
  if (isActive) {
    return (
      <DirectoryHeader.Active onClick={onClick}>
        {categoryToDisplay(category)}
      </DirectoryHeader.Active>
    );
  } else {
    return (
      <DirectoryHeader.Inactive onClick={onClick}>
        {categoryToDisplay(category)}
      </DirectoryHeader.Inactive>
    );
  }
};

const ProductsDropdown: FunctionComponent<{
  toggleDropdown: () => void;
  onClickDirectory: () => unknown;
  onClickReceiver: () => unknown;
  router: NextRouter;
}> = ({ toggleDropdown, router, onClickDirectory, onClickReceiver }) => {
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
    <ProductsRoot ref={ref}>
      <Nav.NavLinkActive onClick={toggleDropdown}>
        Products <Nav.ChevronDownColored />
      </Nav.NavLinkActive>
      <ProductsCard>
        <DropdownItem onClick={onClickReceiver}>Receiver</DropdownItem>
        <DropdownItem onClick={onClickDirectory}>Recon</DropdownItem>
      </ProductsCard>
    </ProductsRoot>
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

export const FullWidthPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
`;

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: calc(252px * 5 + 64px);
  flex-grow: 1;
`;

const ContentColumnNarrow = styled.div`
  max-width: 1376px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 330px;
  padding-bottom: 3rem;
  background: ${({ theme }) => theme.colors.gray["200"]};

  @media screen and (min-width: 400px) {
    background: initial;
  }
`;
const FlexWrapRow = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-content: center;
  width: 100%;
  max-width: 1344px;
  height: auto;
  padding: 0 1rem;
  grid-template-columns: initial;
  grid-gap: 0.5rem;

  @media screen and (min-width: 400px) {
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 250px));
    padding: 0 2rem;
  }

  @media screen and (min-width: 1400px) {
    padding: 0;
  }
`;

const CommunityRoot = styled.div`
  position: relative;
`;
const CommunityCard = styled(Nav.DropdownCard)`
  position: absolute;
  left: -17px;
  z-index: 1;
`;

const ProductsRoot = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: 1.5rem;
`;
const ProductsCard = styled(Nav.DropdownCard)`
  position: absolute;
  left: -26px;
  z-index: 1;
`;
