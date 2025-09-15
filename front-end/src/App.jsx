import './App.css' 
import {Cabecalho,Applist,Appcreate,Appid,Appupdate} from './personal/personal.jsx';
function App() {
    return (
      <div className="containerPrincipal">
        <Cabecalho/>
      
        <div className="colunas">
        <Appcreate />
        <Applist />
        <Appid />
        <Appupdate/>
      </div>
      </div>
    );
  }
  export default App;