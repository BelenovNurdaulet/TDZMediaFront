import { Card } from "@ozen-ui/kit/Card";
import { Stack } from "@ozen-ui/kit/Stack";
import s from './LogoutPage.module.css'
import {LogoutForm} from "@/features/auth/logout/ui/LogoutForm.tsx";

export function LogoutPage() {

    return (
        <Stack align="center" justify="center"  style={{ maxHeight: "100vh" }}>
            <Card className={s.card} borderWidth={'none'}>
                <LogoutForm/>
            </Card>
        </Stack>
    );
}
