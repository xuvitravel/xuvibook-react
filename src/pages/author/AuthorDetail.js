import { useParams } from "react-router-dom";
import PageInfo from "../../components/common/PageInfo";
import AuthorForm from "../../components/forms/AuthorFrom";

const AuthorDetailPage = () => {
  const { id } = useParams();
  return (
    <div className="author_detail_page container mt-4">
      <div>
        <div className="col-md-5 offset-md-3 col-xs-12">
          <PageInfo info={id ? "Edit author" : "Add author"} />
          <AuthorForm id={id}/>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailPage;
