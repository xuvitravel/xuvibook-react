import { useParams } from "react-router-dom";
import PageInfo from "../../components/common/PageInfo";
import BookInfoForm from "../../components/forms/BookInfoFrom";

const BookInfoDetail = () => {
    const { id } = useParams();
    return (
        <div className="author_detail_page container mt-4">
          <div>
            <div className="col-md-5 offset-md-3 col-xs-12">
              <PageInfo info={id ? "Edit book info" : "Add book info"} />
              <BookInfoForm id={id}/>
            </div>
          </div>
        </div>
      );
}

export default BookInfoDetail;