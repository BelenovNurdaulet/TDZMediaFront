import { Provider } from "react-redux";
import { store } from "@/app/store/store";
import { SnackbarProvider } from "@ozen-ui/kit/Snackbar";
import {OzenProvider, themeOzenDark} from "@ozen-ui/kit/OzenProvider";
import type {ReactNode} from "react";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <OzenProvider ssr={{ isEnabled: false }} theme={themeOzenDark}>
            <SnackbarProvider maxMessages={3}>
                <Provider store={store}>
                    {children}
                </Provider>
            </SnackbarProvider>
        </OzenProvider>
    );
}
