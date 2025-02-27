import MyListsPage from "@/pages/MyListsPage.tsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WelcomePage from "./pages/WelcomePage";

import EditList from "@/pages/EditList.tsx";
import EditSharedListList from "@/pages/EditSharedList.tsx";
import NewList from "@/pages/NewList.tsx";
import SharedListsPage from "@/pages/SharedListsPage.tsx";
import UserPage from "@/pages/UserPage.tsx";
import { Logout } from "./pages/Logout.tsx";
import { ROUTES } from "./pages/routes";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={ROUTES.WELCOMEPAGE} element={<WelcomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.LOGOUT} element={<Logout />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route
          path={ROUTES.MYLISTS}
          element={
            <ProtectedRoute>
              <MyListsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.SHAREDLISTS}
          element={
            <ProtectedRoute>
              <SharedListsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.NEWLIST}
          element={
            <ProtectedRoute>
              <NewList />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.EDIT_LIST}
          element={
            <ProtectedRoute>
              <EditList />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.EDIT_SHAREDLISTS}
          element={
            <ProtectedRoute>
              <EditSharedListList />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.USER_PAGE}
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
