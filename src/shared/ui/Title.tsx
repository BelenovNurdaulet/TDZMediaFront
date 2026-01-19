import type {ReactElement} from "react";
import {Typography} from "@ozen-ui/kit/Typography";
import {BreadcrumbItem, Breadcrumbs} from "@ozen-ui/kit/Breadcrumbs";
import {Stack} from "@ozen-ui/kit/Stack";
type Props = {
    title: string;
    href: string;
};
export function Title({title , href}:Props): ReactElement {
    const apiUrl:string = import.meta.env.VITE_API_URL;
    return (
        <Stack direction="column">
            <Breadcrumbs>
                <BreadcrumbItem href={`${apiUrl}/${href}`}>
                    {title}
                </BreadcrumbItem>
            </Breadcrumbs>
            <Typography variant="heading-xl">{title}</Typography>
        </Stack>

    )
}