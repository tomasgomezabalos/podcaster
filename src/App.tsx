import {lazy, Suspense} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Loading from "./components/atoms/Loading";
import Layout from "./components/molecules/Layout";

const Podcasts = lazy(() => import("./components/pages/Podcasts"));
const Podcast = lazy(() => import("./components/pages/Podcast"));
const Episode = lazy(() => import("./components/pages/Episode"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={(
            <Suspense fallback={<Loading />}>
              <Podcasts />
            </Suspense>
          )}
        />
        <Route
          index
          path='/podcast/:podcastId'
          element={(
            <Suspense fallback={<Loading />}>
              <Podcast />
            </Suspense>
          )}
        />
        <Route
          index
          path='/podcast/:podcastId/episode/:episodeId'
          element={(
            <Suspense fallback={<Loading />}>
              <Episode />
            </Suspense>
          )}
        />
        <Route path="*" element={<Podcasts />} />
      </Route>
    </Routes>
  )
}

export default App
