
import classes from "./PageInfo.module.css";

const PageInfo = ({ info = "Page info" }) => {
  return (
    <>
      <h4 className={`text-center p-2 ${classes.page_info}`}>{info}</h4>
    </>
  );
};

export default PageInfo;
