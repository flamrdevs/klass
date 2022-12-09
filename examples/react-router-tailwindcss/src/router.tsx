import { createBrowserRouter } from "react-router-dom";

import App from "./App";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <div className="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
            Home Page
          </div>
        ),
      },
      {
        path: "/about",
        element: (
          <div className="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
            About Page
          </div>
        ),
      },
      {
        path: "/contact",
        element: (
          <div className="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
            Contact Page
          </div>
        ),
      },
    ],
  },
]);

export default router;
