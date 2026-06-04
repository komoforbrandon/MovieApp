import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import MovieDetails from '../pages/MovieDetails'
import Tvshow from '../pages/Tvshow'
import Movie from '../pages/Movies'
import Watchlist from '../pages/Watchlist'
import PopularTv from '../pages/populartv'

const routes = [
    { path: '/', element: <Home /> },
    { path: '/movies', element: <Movie /> },
    {path: '/tv-shows', element: <Tvshow />},
    {path: '/new-and-popular', element: <PopularTv />},
    {path: '/watchlist', element: <Watchlist />},
    {path: '/:type/:id', element: <MovieDetails />},
    {path: '*', element: <Home /> }
]

export default function AppRoutes() {
    return (
        <Routes>
            {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
            ))}
        </Routes>
    )
}