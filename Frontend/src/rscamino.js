import './rscamino.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import RegisterForm from './pages/session/register/register-form';
import Login from './pages/session/login/login-form';
import ResetPassword from './pages/session/password/resetpassword/resetPassword';
import ValidateUser from './pages/session/validateuser/validate';
import ResetUsuarioPass from './pages/session/password/resetpassword/resetUsuarioPass';
import Home from './pages/home/Home';
import Trendings from './pages/trendings/Trendings';
import Search from './pages/search/Search';
import PhotoWall from './pages/photoWall/PhotoWall';
import Profile from './pages/profile/Profile';
import SimpleTabs from './pages/about/about';

// const Login = lazy(() => import('./pages/session/login/login-form'));
// const RegisterForm = lazy(() =>
//     import('./pages/session/register/register-form')
// );
// const ResetPassword = lazy(() =>
//     import('./pages/session/password/resetpassword/resetPassword')
// );
// const ValidateUser = lazy(() =>
//     import('./pages/session/validateuser/validate')
// );
// const ResetUsuarioPass = lazy(() =>
//     import('./pages/session/password/resetpassword/resetUsuarioPass')
// );
// const Home = lazy(() => import('./pages/home/Home'));
// const Profile = lazy(() => import('./pages/profile/Profile'));
// const Search = lazy(() => import('./pages/search/Search'));
// const Trendings = lazy(() => import('./pages/trendings/Trendings'));
// const PhotoWall = lazy(() => import('./pages/photoWall/PhotoWall'));

function Rscamino() {
    return (
        <ErrorBoundary>
            <Router>
                <div className="App">
                    <Switch>
                        {/* <Suspense fallback={<div>Cargando...</div>}> */}
                        <Route exact path={`/perfil/:idUsuario`}>
                            <Profile />
                        </Route>

                        <Route exact path={'/login'}>
                            <Login />
                        </Route>
                        <Route exact path={'/register'}>
                            <RegisterForm />
                        </Route>
                        <Route exact path={'/resetpassword'}>
                            <ResetPassword />
                        </Route>
                        <Route
                            exact
                            path={'/usuarios/validate/:registrationCode'}
                        >
                            <ValidateUser />
                        </Route>
                        <Route exact path={'/:idUsuario/password'}>
                            <ResetUsuarioPass />
                        </Route>

                        <Route exact path={'/tendencias/'}>
                            <Trendings />
                        </Route>
                        <Route exact path={'/search'}>
                            <Search />
                        </Route>
                        <Route exact path={'/photos/:id'}>
                            <PhotoWall />
                        </Route>
                        <Route exact path={'/contacto'}>
                            <SimpleTabs />
                        </Route>

                        <Route exact path={'/'}>
                            <Home />
                        </Route>

                        {/* </Suspense> */}
                    </Switch>
                </div>
            </Router>
        </ErrorBoundary>
    );
}

export default Rscamino;

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Actualiza el estado para que el siguiente renderizado muestre la interfaz de repuesto
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // También puedes ejecutar codigo  cuando hay un error
    }

    render() {
        if (this.state.hasError) {
            return <h1>Ha habido un error en la App</h1>;
        }

        return this.props.children;
    }
}
