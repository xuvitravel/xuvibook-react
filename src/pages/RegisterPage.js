import HeadingTags from "../components/common/HeadingTag";
import AuthForm from "../components/forms/AuthFrom";

const RegisterPage = () => {
  return (
    <div className={`auth_page container mt-4`}>
      <div className="col-md-4 offset-md-4 col-xs-12">
        <HeadingTags Tag="h1" classStyle="text-center" textContent="Sign up" />
        <AuthForm loginForm={false} />
      </div>
    </div>
  );
};

export default RegisterPage;
