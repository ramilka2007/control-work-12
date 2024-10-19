import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/users/usersSlice.ts";
import Toolbar from "./UI/Toolbar/Toolbar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./container/Home/Home.tsx";
import Register from "./features/users/Register.tsx";
import Login from "./features/users/Login.tsx";
import ProtectedRoute from "./UI/ProtectedRoute/ProtectedRoute.tsx";
import PhotoForm from "./container/Photos/PhotoForm.tsx";
import Photos from "./container/Photos/Photos.tsx";

const App = () => {
    const user = useAppSelector(selectUser);
    return (
        <>
            <header>
                <Toolbar />
            </header>
            <main className="mt-5">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/add-photo" element={<ProtectedRoute isAllowed={user}><PhotoForm/></ProtectedRoute>}/>
                    <Route path="/photos/user/:id" element={<ProtectedRoute isAllowed={user}><Photos/></ProtectedRoute>}/>
                </Routes>
            </main>
        </>
    );
};

export default App;
