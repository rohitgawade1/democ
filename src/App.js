// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './AllRoutes';
import './App.css';
import { AuthProvider } from './Helper/Context/contex';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AuthProvider>
          <AllRoutes />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
