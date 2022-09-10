// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Store
import { Provider } from 'react-redux';
import store from './store/store';
// Components
import Layout from './components/Layout/Layout';
import NotFound from './components/Error/NotFound';
import Test from './components/TestStore';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>my h1</h1>} />
            <Route path=":id" element={<Test />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
