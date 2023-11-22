import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useMutation } from "react-query";
import { CURRENT_API_URL } from "../../config";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAuth } from "../../redux/slice/authSlice";
import { updateUser } from "../../redux/slice/userSlice";
import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";

const AuthForm = ({ loginForm = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let validateSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  let initData = { email: "", password: "" };
  if (!loginForm) {
    initData.name = "";
    initData.password_confirmation = "";
    validateSchema = yup.object().shape({
      ...validateSchema.fields,
      name: yup.string().required(),
      password_confirmation: yup
        .string()
        .required()
        .oneOf([yup.ref("password"), null]),
    });
  }

  const mutation = useMutation({
    mutationFn: (data) => authAction(data),
  });

  const authAction = async (data) => {
    if (!loginForm) {
      await axios
        .post(`${CURRENT_API_URL}/register`, data)
        .then((res) => {
          const { success } = res?.data;
          if (success === true) {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    } else {
      
      await axios
        .post(`${CURRENT_API_URL}/login`, data, {
          headers: {
             'Access-Control-Allow-Origin': '*',
             'Content-Type': 'application/json',
          } 
       }
       )
        .then((res) => {
          let data = res?.data?.data;
          if (data) {
            let token = data?.token;
            let expires_in = data?.expires_in;
            dispatch(updateAuth({ token: token, expires_in: expires_in }));
            localStorage.setItem('token', token);
            let user = data?.user;
            dispatch(updateUser(user));
            navigate("/user");
          }
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  };

  async function submitAuthFrom(data) {
    let user = {
      email: data.email,
      password: data.password,
    };
    if (!loginForm) {
      user.password_confirmation = data.password_confirmation;
      user.name = data.name;
    }
    mutation.mutate(user);
  }
  return (
    <Formik
      initialValues={initData}
      validationSchema={validateSchema}
      onSubmit={async (values, actions) => {
        await submitAuthFrom(values);
      }}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          {!loginForm && (
            <>
              <Form.Group className="mb-3 mt-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <ErrorMessage name="name">
                {(msg) => (
                  <Alert variant="danger" className="mt-1 py-2">
                    {msg}
                  </Alert>
                )}
              </ErrorMessage>
            </>
          )}
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              required
              value={values.email}
              onChange={handleChange}
            />
            <ErrorMessage name="email">
              {(msg) => (
                <Alert variant="danger" className="mt-1 py-2">
                  {msg}
                </Alert>
              )}
            </ErrorMessage>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              required
              value={values.password}
              onChange={handleChange}
            />
            <ErrorMessage name="password">
              {(msg) => (
                <Alert variant="danger" className="mt-1 py-2">
                  {msg}
                </Alert>
              )}
            </ErrorMessage>
          </Form.Group>

          {!loginForm && (
            <>
              <Form.Group className="mb-3" controlId="password_confirmation">
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                  name="password_confirmation"
                  type="password"
                  placeholder="Password confirmation"
                  value={values.password_confirmation}
                  onChange={handleChange}
                />
                <ErrorMessage name="password_confirmation">
                  {(msg) => (
                    <Alert variant="danger" className="mt-1 py-2">
                      {msg}
                    </Alert>
                  )}
                </ErrorMessage>
              </Form.Group>
            </>
          )}

          <div className="text-end">
            <Button
              variant="primary"
              type="submit"
              disabled={mutation.isLoading}
            >
              {loginForm ? "Login" : "Signup"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AuthForm;
