import {Container} from "@ozen-ui/kit/Container";
import {Card} from "@ozen-ui/kit/Card";

import {Loader} from "@ozen-ui/kit/Loader";
import {Stack} from "@ozen-ui/kit/Stack";
import {Typography} from "@ozen-ui/kit/Typography";
import {Button} from "@ozen-ui/kit/ButtonNext";

import {useGetMeQuery} from "@/entities/user/userApi";
import {useLogout} from "@/features/auth/logout/model/useLogout";


import s from "./ProfilePage.module.css";
import {DeleteAccountButton} from "@/features/user/userProfile/ui/deleteAccount/DeleteAccountButton.tsx";
import {ResetPasswordButton} from "@/features/user/userProfile/ui/resetPassword/ResetPasswordButton.tsx";
import {ChangePasswordForm} from "@/features/user/userProfile/ui/changePassword/ChangePasswordForm.tsx";
import {UpdateProfileForm} from "@/features/user/userProfile/ui/updateProfileForm/UpdateProfileForm.tsx";
import {SectionMessage} from "@ozen-ui/kit/SectionMessage";
import {Accordion, AccordionDetails, AccordionSummary} from "@ozen-ui/kit/Accordion";
import {Grid, GridItem} from "@ozen-ui/kit/Grid";
import {Avatar} from "@ozen-ui/kit/Avatar";
import {useState} from "react";
import {Title} from "@/shared/ui/Title.tsx";
import {Footer} from "@/widgets/footer/Footer.tsx";
import {useRoleMap} from "@/shared/hooks/useRoleMap.ts";

export function ProfilePage() {
    const {data: me, isLoading, isFetching, error} = useGetMeQuery();
    const {onLogout} = useLogout({});
    const roleMap = useRoleMap();

    const [currentExpanded, setCurrentExpanded] = useState<number>(0);

    const handleChange = (accordionNumber: number) => () => {
        setCurrentExpanded(accordionNumber);
    };
    if (isLoading || isFetching) return <Loader/>;

    if (!me) {
        return (
            <Container className={s.container} position="center">
                <Typography variant="heading-xl">Профиль</Typography>
                <Typography color="secondary">Вы не авторизованы</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className={s.container} position="center">
                <Typography variant="heading-xl">Профиль</Typography>
                <Typography color="error">Ошибка загрузки</Typography>
            </Container>
        );
    }
    return (
        <Stack direction="column" gap="m" className={s.container}>
            <Title title="Профиль"  href="profile" />
            <Grid cols={{xs: 1, m: 2}} gap="2xl">
                <GridItem>
                    <Card size="s" borderWidth="none" style={{padding: 24}}>
                        <Stack direction="column" align="center" gap="l" fullWidth>
                            <Avatar name={`${me.firstName} ${me.lastName}`} size="xl"/>
                            <Stack direction="column" gap="xs" align="center">
                                <Typography
                                    variant="heading-l">{`${me.lastName} ${me.firstName} ${me.surName ?? ''}`}</Typography>
                                <Typography color="secondary">{me.email}</Typography>
                                <Typography color="secondary">  {roleMap[me.role] ?? me.role}</Typography>
                            </Stack>
                            <Button size="s" color="error" onClick={onLogout}>Выйти</Button>
                        </Stack>
                    </Card>
                    <Footer/>
                </GridItem>

                <GridItem>
                    <Stack direction="column" gap="m" fullWidth >
                        <Accordion
                            size="s"
                                   variant="round"
                                   onChange={handleChange(0)}
                                   expanded={0 === currentExpanded}>
                            <AccordionSummary>
                                <Typography variant="heading-l" >Редактировать профиль</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Card borderWidth="none" size="s">
                                    <Stack direction="column" gap="m" fullWidth>
                                        <UpdateProfileForm user={me} canEditRole={true}/>
                                    </Stack>
                                </Card>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion
                            size="s"
                            variant="round"
                            onChange={handleChange(1)}
                            expanded={1 === currentExpanded}>
                            <AccordionSummary>
                                <Typography variant="heading-l">Сменить пароль</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Card borderWidth="none" size="s">
                                    <Stack direction="column" gap="m" fullWidth>
                                        <ChangePasswordForm/>
                                    </Stack>
                                </Card>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion
                            size="s"
                            variant="round"
                            onChange={handleChange(2)}
                            expanded={2 === currentExpanded}>
                            <AccordionSummary>
                                <Typography variant="heading-l">Действия</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Card borderWidth="none" size="s">
                                    <Stack direction="column" gap="m" fullWidth>
                                        <Stack direction="row" gap="m" wrap>
                                            <ResetPasswordButton userId={me.id}/>
                                            <DeleteAccountButton userId={me.id}/>
                                        </Stack>
                                        <SectionMessage size="s">
                                            Стандартный пароль после сброса "123456"
                                        </SectionMessage>
                                    </Stack>
                                </Card>
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </GridItem>
            </Grid>
        </Stack>
    );
}
