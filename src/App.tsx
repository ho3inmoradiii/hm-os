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
    ToastContainer,
    GlobalHeader,
    MinimizedWindowsContainer,
    CommandPalette,
    DesktopIcons
} from '@components';

const App = () => {
    useGlobalContextMenu();
    useSystemAppearance();
    useGlobalShortcuts();
    useIdleTimer();

    return (
        <main className="w-screen h-screen overflow-hidden relative selection:bg-ph-orange selection:text-white">
            <GlobalHeader />

            <DesktopBackground/>

            <DesktopIcons />

            <ScreensaverContainer />

            <div className="absolute top-12 left-0 right-0 bottom-0 z-10 pointer-events-none overflow-hidden">
                <h1 className="text-4xl select-none absolute center text-black dark:text-red-500 opacity-0">
                    MORADI OS
                </h1>

                <WindowManager/>
            </div>

            <ContextMenu/>

            <ToastContainer/>

            <CommandPalette />

            <MinimizedWindowsContainer />
        </main>
    );
}

export default App;
