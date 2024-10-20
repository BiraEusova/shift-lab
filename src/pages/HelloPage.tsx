import welcomeImg from "../assets/welcome.svg"
import {useAppDispatch } from "../store/hook.ts";
import {authSlice} from "../store/authSlice.ts";

const HelloPage = () => {

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(authSlice.actions.logOut())
    }

    return (
        <div style={{width:'50%', height: 'fit-content'}}>
            <img style={{width: '100%'}} src={welcomeImg} />
            <p>Привет, авторизованный пользователь!</p>
            <button onClick={onClickHandler}>Пройти авторизацию снова!</button>
        </div>
    );
}

export default HelloPage