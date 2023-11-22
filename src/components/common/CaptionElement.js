import classes from "./CaptionElement.module.css";

const CaptionElement = ({ caption = "Component as Header" }) => {
  return (
    <>
      <h3 className={`text-center p-2 ${classes.caption_element} mt-4`}>
        {caption}
      </h3>
    </>
  );
};

export default CaptionElement;
