import './App.css'
import AuthPage from "./pages/AuthPage.tsx";
import {useAppSelector} from "./store/hook.ts";
import HelloPage from "./pages/HelloPage.tsx";

function App() {

   const { auth } = useAppSelector(state => state.auth);

   return (
       <div className="container">
           { auth && <HelloPage/> }
           { !auth && <AuthPage/> }
       </div>
   )
}

export default App
