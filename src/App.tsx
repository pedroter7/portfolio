import "./app.css";
import { useMediaQuery } from "react-responsive";
import DesktopApp from "./DesktopApp";
import MobileApp from "./MobileApp";
import UnknownDeviceApp from "./UnknownDeviceApp";

const App = () => {
  const isMobile = useMediaQuery({ minWidth: "320px" });
  const isDesktop = useMediaQuery({ minWidth: "801px" });

  console.log("render again");
  return isDesktop ? (
    <DesktopApp />
  ) : isMobile ? (
    <MobileApp />
  ) : (
    <UnknownDeviceApp />
  );
};

export default App;
