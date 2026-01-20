import {useSnackbar} from "@ozen-ui/kit/Snackbar";
import {useLogoutMutation} from "@/entities/auth/authApi.ts";
import {useNavigate} from "react-router-dom";
import {baseApi} from "@/shared/api/baseApi.ts";
import {useDispatch} from "react-redux";

type Params = {
    onSuccess?: () => void;
};

export function useLogout({onSuccess}: Params) {
    const navigate = useNavigate();
    const {pushMessage} = useSnackbar();
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();

    const onLogout = async () => {
        try {
            await logout().unwrap();
            onSuccess?.();
            dispatch(baseApi.util.resetApiState());
            navigate("/login");

        } catch (error: any) {
            pushMessage({
                title: "Ошибка выхода",
                description: String(error?.data?.error?.message ?? "Не удалось войти"),
                status: "error",
            });
        }
    };
    return {onLogout}
}
