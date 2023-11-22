import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useMutation, useQuery } from "react-query";
import AuthorAPI from "../../apis/AuthorAPI";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { AUTHOR_ROUTE } from "../../utilis/utiliCommon";

const AuthorForm = ({ id = null }) => {
  const navigate = useNavigate();
  const queryOptions = {
    queryKey: ["author", { id: id }],
    staleTime: Infinity,
    queryFn: async () => {
        if (id) {
            return await AuthorAPI.show({ id: id });
        }
        return null;
    },
};
  const { isLoading, error, data } = useQuery(queryOptions);
  let validateSchema = yup.object().shape({
    author_name: yup.string().required(),
    place_of_origin: yup.string().nullable(true),
    info: yup.string().nullable(true),
  });

  let initData = { author_name: "", place_of_origin: "", info: "" };
  if(data) {
    initData.author_name = data.author_name;
    initData.place_of_origin = data.place_of_origin;
    initData.info = data.info;
  }

  const mutation = useMutation({
    mutationFn: (data) => authorActions(data),
  });

  const authorActions = async (data) => {
    let result;
    if (data.id) {
      result = await AuthorAPI.update(data);
      navigate({
        pathname: `${AUTHOR_ROUTE}/${result.id}`
      })
    } else {
      result = await AuthorAPI.create(data);
      if (result?.id) {
        console.log(result);
        navigate({
          pathname: `${AUTHOR_ROUTE}/${result.id}`
        })
      }
    }
  };
  async function submitAuthorForm(data) {
    let authorData = {
      author_name: data.author_name,
      place_of_origin: data.place_of_origin,
      info: data.info,
    };
    if (id) {
      authorData.id = id;
    }
    mutation.mutate(authorData);
  }

  const backToPrevious = () => {
    navigate({
      pathname: `${AUTHOR_ROUTE}`
    })
  }

  return (
    <>
    {!isLoading && (<Formik
        initialValues={initData}
        validationSchema={validateSchema}
        onSubmit={async (values, actions) => {
          await submitAuthorForm(values);
        }}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 mt-3" controlId="author_name">
              <Form.Label>Author name</Form.Label>
              <Form.Control
                name="author_name"
                type="text"
                placeholder="Author name"
                value={values.author_name || ''}
                onChange={handleChange}
              />
              <ErrorMessage name="author_name">
                {(msg) => (
                  <Alert variant="danger" className="mt-1 py-2">
                    {msg}
                  </Alert>
                )}
              </ErrorMessage>
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="place_of_origin">
              <Form.Label>Place of origin</Form.Label>
              <Form.Control
                name="place_of_origin"
                type="text"
                placeholder="Place of origin"
                value={values.place_of_origin || ''}
                onChange={handleChange}
              />
              <ErrorMessage name="place_of_origin">
                {(msg) => (
                  <Alert variant="danger" className="mt-1 py-2">
                    {msg}
                  </Alert>
                )}
              </ErrorMessage>
            </Form.Group>
            <Form.Group className="mb-3" controlId="info">
              <Form.Label>Author info</Form.Label>
              <Form.Control
                name="info"
                as="textarea"
                rows={5}
                value={values.info || ''}
                placeholder="Author info"
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
                  disabled={mutation.isLoading} >
                  {id ? "Save" : "Add"}
                </Button>
            </div>
          </Form>
        )}
      </Formik>)}
      
    </>
  );
};

export default AuthorForm;
