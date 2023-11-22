import HeadingTags from "../components/common/HeadingTag";
import AuthForm from "../components/forms/AuthFrom";

const LoginPage = () => {
  return (
    <div className={`auth_page container mt-4`}>
      <div className="col-md-4 offset-md-4 col-xs-12">
        <HeadingTags Tag="h1" classStyle="text-center" textContent="Log in" />
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;
