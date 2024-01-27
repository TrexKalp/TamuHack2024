import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// 1. import `ChakraProvider` component
import {ChakraProvider} from "@chakra-ui/react";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider>
        <DevSupport ComponentPreviews={ComponentPreviews}
                    useInitialHook={useInitial}
        >
            <App/>
        </DevSupport>
    </ChakraProvider>
);
