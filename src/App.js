import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/Content/Content';
import ModalContext from './components/Context/ModalContext';
function App() {
  return (
    <div className="App">
      <ModalContext>
        <Content/>
      </ModalContext>
    </div>
  );
}

export default App;
