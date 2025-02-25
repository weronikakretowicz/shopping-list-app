import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import { Board } from "./pages/Board.tsx";
import MyListsPage from "@/pages/MyListsPage.tsx";

import { ROUTES } from "./pages/routes";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { Logout } from "./pages/Logout.tsx";
import SharedListsPage from "@/pages/SharedListsPage.tsx";
import NewList from "@/pages/NewList.tsx";
import EditList from "@/pages/EditList.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={ROUTES.WELCOMEPAGE} element={<WelcomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.LOGOUT} element={<Logout />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route
          path={ROUTES.BOARD}
          element={
            <ProtectedRoute>
              <Board />
            </ProtectedRoute>
          }
        />
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
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
