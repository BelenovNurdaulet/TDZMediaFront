import {useNavigate} from "react-router-dom";
import {Card} from "@ozen-ui/kit/Card";
import {Stack} from "@ozen-ui/kit/Stack";
import s from './RegisterPage.module.css'
import {RegisterForm} from "@/features/auth/register/ui/RegisterForm.tsx";
import {Footer} from "@/widgets/footer/Footer.tsx";

export function RegisterPage() {
    const navigate = useNavigate();

    return (
        <>
            <Stack align="center" justify="center" style={{maxHeight: "100vh"}}>
                <Card className={s.card} borderWidth={'none'}>
                    <RegisterForm onSuccess={() => navigate("/login", {replace: true})}/>
                </Card>
            </Stack>
            <Footer/>
        </>
    );
}
