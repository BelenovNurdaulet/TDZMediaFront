import {Typography} from "@ozen-ui/kit/Typography";
import s from "./Footer.module.css"
export function Footer() {

    const currentYear = new Date().getFullYear();

    return(
        <footer className={s.footer}>
            <Typography color="disabled">
                © {currentYear}, Made with ❤️ from TDZ
            </Typography>
        </footer>
    )
}