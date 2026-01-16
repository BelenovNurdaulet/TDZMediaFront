import {useNavigate} from "react-router-dom";
import {LoginForm} from "@/features/auth/login/ui/LoginForm.tsx";
import {Card} from "@ozen-ui/kit/Card";
import {Stack} from "@ozen-ui/kit/Stack";
import s from './LoginPage.module.css'
import {Footer} from "@/widgets/footer/Footer.tsx";

export function LoginPage() {
    const navigate = useNavigate();

    return (
        <>
            <Stack align="center" justify="center" style={{maxHeight: "100vh"}}>
                <Card className={s.card} borderWidth={'none'}>
                    <LoginForm onSuccess={() => navigate("/", {replace: true})}/>
                </Card>
            </Stack>
            <Footer/>
        </>
    );
}
