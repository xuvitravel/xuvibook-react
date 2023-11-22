import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layouts/RootLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserPage from "../pages/UserPage";
import AuthorPage from "../pages/author/AuthorPage";
import AuthorDetailPage from "../pages/author/AuthorDetail";
import BookInfoPage from "../pages/bookInfo/BookInfoPage";
import BookInfoDetail from "../pages/bookInfo/BookInfoDetail";

const route = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: "<ErrorPage />",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <RegisterPage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "author",
        children: [
          {
            index: true,
            element: <AuthorPage />,
          },
          {
            path: "add",
            element: <AuthorDetailPage />,
          },
          {
            path: ":id",
            element: <AuthorDetailPage />,
          },
        ],
      },
      {
        path: "book-info",
        children: [
          {
            index: true,
            element: <BookInfoPage />,
          },
          {
            path: "add",
            element: <BookInfoDetail />,
          },
          {
            path: ":id",
            element: <BookInfoDetail />,
          },
        ],
      },
    ],
  },
]);

export default route;
