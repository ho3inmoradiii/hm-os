import { useGlobalContextMenu } from "@hooks/useGlobalContextMenu.ts";
import { ContextMenu } from "@components/ContextMenu.tsx";

const App = () => {
    useGlobalContextMenu();

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <h1 className="text-4xl font-bold text-white">
                Tailwind v4 is alive, Morty.
            </h1>

            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold font-mono tracking-tighter">
                    Right Click <span className="text-ph-orange">Me!</span>
                </h1>
            </div>

            <ContextMenu/>
        </div>
    );
}

export default App;
