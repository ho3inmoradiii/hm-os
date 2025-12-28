import {
    useGlobalContextMenu,
    useSystemAppearance,
    useGlobalShortcuts,
    useIdleTimer
} from "@hooks";
import {
    ContextMenu,
    WindowManager,
    DesktopBackground,
    ScreensaverContainer,
    ToastContainer
} from '@components';

const App = () => {
    useGlobalContextMenu();
    useSystemAppearance();
    useGlobalShortcuts();
    useIdleTimer();

    return (
        <main className="w-screen h-screen overflow-hidden relative selection:bg-ph-orange selection:text-white">
            <DesktopBackground/>

            <ScreensaverContainer />

            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none overflow-hidden">
                <h1 className="text-4xl select-none absolute center text-black dark:text-red-500 opacity-0">
                    MORADI OS
                </h1>

                <WindowManager />
            </div>

            <ContextMenu/>

            <ToastContainer />
        </main>
    );
}

export default App;
