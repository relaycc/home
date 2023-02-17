import { FunctionComponent } from "preact/compat";
import LandingPage from "@/components/LandingPage";
import LandingPageMobile from "@/components/LandingPageMobile";

const Index: FunctionComponent = () => {
  return (
    <>
      <LandingPage />
      <LandingPageMobile />
    </>
  );
};

export default Index;
