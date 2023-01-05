import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import Layout from "./components/Layout";
import LoadingPage from "./pages/LoadingPage";
import Home from "./pages/Home";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 1000,
    },
  },
});

const Search = React.lazy(() => import("./pages/Search"));
const Profile = React.lazy(() => import("./pages/Profile"));
const PostDetail = React.lazy(() => import("./pages/PostDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/search",
        element: (
          <React.Suspense fallback={<LoadingPage />}>
            <Search />
          </React.Suspense>
        ),
      },
      {
        path: "/:username",
        element: (
          <React.Suspense fallback={<LoadingPage />}>
            <Profile />
          </React.Suspense>
        ),
        errorElement: <>error</>,
      },
      {
        path: "/posts/:postId",
        element: (
          <React.Suspense fallback={<LoadingPage />}>
            <PostDetail />
          </React.Suspense>
        ),
        errorElement: <>error</>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer autoClose={4000} theme="light" position="top-right" />
    </QueryClientProvider>
  </React.StrictMode>
);
