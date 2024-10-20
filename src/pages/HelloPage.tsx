import welcomeImg from "../assets/welcome.svg"
import {useAppDispatch } from "../store/hook.ts";
import {authSlice} from "../store/authSlice.ts";
import Button from "../components/Button/Button.tsx";

const HelloPage = () => {

    const dispatch = useAppDispatch();
    const onClickHandler = () => {
        dispatch(authSlice.actions.logOut())
    }

    return (
        <div style={{width:'50%', height: 'fit-content'}}>
            <img style={{width: '100%'}} src={welcomeImg} />
            <p>Привет, авторизованный пользователь!</p>
            <Button onClick={onClickHandler}>Пройти авторизацию снова!</Button>
        </div>
    );
}

export default HelloPage