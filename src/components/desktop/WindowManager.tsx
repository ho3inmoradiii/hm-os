import React from 'react';
import { useWindowStore } from '@store';
import { WindowFrame } from "./WindowFrame.tsx";
import { DisplayOptions } from '../settings/DisplayOptions';

const WINDOW_COMPONENTS: Record<string, React.ElementType> = {
    'settings': DisplayOptions,
    // 'calculator': CalculatorApp,
    // 'vscode': VSCodeApp,
};

export const WindowManager = () => {
    const { windows } = useWindowStore();

    return (
        <>
            {Object.values(windows).map((window) => {
                const Component = WINDOW_COMPONENTS[window.id];

                if (!Component) {
                    console.error(`❌ Component for ${window.id} NOT FOUND! Check imports.`);
                    return null;
                }

                return (
                    <WindowFrame key={window.id} id={window.id}>
                        <Component />
                    </WindowFrame>
                );
            })}
        </>
    );
};
