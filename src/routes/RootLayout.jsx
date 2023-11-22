import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

function RootLayout(props) {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default RootLayout;
