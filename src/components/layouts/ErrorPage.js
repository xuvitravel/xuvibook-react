import Header from "./Header";
import { useRouteError } from "react-router-dom";
import PageContent from "./PageContent";

const ErrorPage = () => {
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong!";

  // Todo: defined message with status code
  // if (error) {
  //     // console.log('error', error);
  // }

  return (
    <>
      <Header />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default ErrorPage;
