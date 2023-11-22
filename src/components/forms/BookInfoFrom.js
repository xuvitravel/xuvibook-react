import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import AuthorAPI from "../../apis/AuthorAPI";
import { useMutation, useQuery } from "react-query";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { BOOK_INFO_ROUTE } from "../../utilis/utiliCommon";
import ReactSelect from 'react-select';
import BookInfoAPI from "../../apis/BookInfoAPI";

const BookInfoForm = ({ id = null }) => {
    const navigate = useNavigate();
    const queryOptions = {
        queryKey: ["bookInfoDetail", { id: id }],
        staleTime: Infinity,
        queryFn: async () => {
            if (id) {
                return await BookInfoAPI.show({ id: id });
            }
            return null;
        },
    };
    const bookInfoData = useQuery(queryOptions);
    
    let validateSchema = yup.object().shape({
        book_name: yup.string().required(),
        info: yup.string().nullable(true),
    });
    let initData = {
        book_name: "",
        author_name: "",
        author_id: "",
        info: ""
    };
    if (bookInfoData && bookInfoData.data) {
        initData.book_name = bookInfoData.data?.book_name
        initData.author_id = { value: bookInfoData.data?.author_id, label: bookInfoData?.data?.author_name }
        initData.info = bookInfoData.data?.info
    }
    const mutation = useMutation({
        mutationFn: (data) => bookActions(data),
    });
    const bookActions = async (data) => {
        console.log('data', data,);
        let result;
        if (data.id) {
            result = await BookInfoAPI.update(data);
            navigate({
                pathname: `${BOOK_INFO_ROUTE}/${result.id}`
            })
        } else {
            result = await BookInfoAPI.create(data);
            if (result?.id) {
                navigate({
                    pathname: `${BOOK_INFO_ROUTE}/${result.id}`
                })
            }
        }
    };
    let paramsSearchAuthor = {
        // Todo: For search author select - pagiation data
    }
    const authorSelectData = useQuery(
        ["author"],
        () => AuthorAPI.getDataSelect(paramsSearchAuthor),
        // todo cache previos data
        Infinity
    );

    console.log('initData', initData);

    async function submitBookInfoForm(data) {
        let bookInfo = {
            book_name: data.book_name,
            info: data.info,
        };
        if (data.author_name) {
            bookInfo.author_name = data.author_name
        } else {
            bookInfo.author_id = data.author_id.value
        }
        if (id) {
            bookInfo.id = id;
        }
        mutation.mutate(bookInfo);
    }
    const authorSelectList = authorSelectData && authorSelectData?.data ? authorSelectData.data.map(item => { return { value: item.id, label: item.author_name } }) : null;
    const backToPrevious = () => {
        navigate({
            pathname: `${BOOK_INFO_ROUTE}`
        })
    }

    return (<>
        {!bookInfoData?.isLoading && <Formik initialValues={initData}
            validationSchema={validateSchema}
            onSubmit={async (values, actions) => {
                await submitBookInfoForm(values);
            }}>
            {({ values, errors,
                handleChange, handleSubmit,
                handleBlur, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3 mt-3" controlId="book_name">
                        <Form.Label>Book name</Form.Label>
                        <Form.Control
                            name="book_name"
                            type="text"
                            placeholder="Book name"
                            value={values.book_name || ''}
                            onChange={handleChange}
                        />
                        <ErrorMessage name="book_name">
                            {(msg) => (
                                <Alert variant="danger" className="mt-1 py-2">
                                    {msg}
                                </Alert>
                            )}
                        </ErrorMessage>
                    </Form.Group>
                    <Form.Group className="mb-3 mt-3" controlId="author_name">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            name="author_name"
                            type="text"
                            placeholder="Author name"
                            value={values.author_name || ''}
                            onChange={handleChange}
                        />
                        <ReactSelect
                            name="author_id"
                            value={values.author_id || ''}
                            options={authorSelectList}
                            onBlur={handleBlur}
                            onChange={option => setFieldValue("author_id", option)}
                        />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="info">
                        <Form.Label>Book info</Form.Label>
                        <Form.Control
                            name="info"
                            as="textarea"
                            rows={5}
                            value={values.info || ''}
                            placeholder="Book info"
                            onChange={handleChange}
                        />
                        <ErrorMessage name="info">
                            {(msg) => (
                                <Alert variant="danger" className="mt-1 py-2">
                                    {msg}
                                </Alert>
                            )}
                        </ErrorMessage>
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                        <Button
                            variant="secondary"
                            onClick={backToPrevious}
                        >
                            Back
                        </Button>
                        <Button
                            variant="info"
                            type="submit"
                            disabled={mutation.isLoading}
                        >
                            {id ? "Save" : "Add"}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>}
    </>)
}

export default BookInfoForm;