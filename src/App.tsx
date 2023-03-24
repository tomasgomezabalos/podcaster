import {lazy, Suspense} from 'react'
import './App.css'
import {Route, Routes} from "react-router-dom";
import Loading from "./components/atoms/loading";
import Layout from "./components/pages/layout";

const Podcasts = lazy(() => import("./components/pages/podcasts"));
const Podcast = lazy(() => import("./components/pages/podcast"));
const Episode = lazy(() => import("./components/pages/episode"));

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
