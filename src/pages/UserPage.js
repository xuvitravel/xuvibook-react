import { useSelector } from "react-redux";

const UserPage = () => {
  const userData = useSelector((state) => state.user);
  const authData = useSelector((state) => state.auth);
  console.log("userData", userData);
  console.log("authData", authData);
  return <>userPage</>;
};
export default UserPage;
