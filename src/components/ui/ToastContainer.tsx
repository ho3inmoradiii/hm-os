import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToastStore } from '@store';

export const ToastContainer = () => {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-3 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="pointer-events-auto bg-[#1e1e1e] border border-[#333] text-gray-200 p-4 rounded-lg shadow-2xl min-w-[300px] flex items-start gap-3"
                    >
                        <div className="mt-0.5">
                            {toast.type === 'success' && <CheckCircle size={16} className="text-green-500" />}
                            {(toast.type === 'info' || !toast.type) && <Info size={16} className="text-blue-400" />}
                            {toast.type === 'warning' && <AlertTriangle size={16} className="text-yellow-500" />}
                        </div>

                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-white leading-tight">
                                {toast.title}
                            </h4>
                            {toast.description && (
                                <p className="text-sm text-gray-400 mt-1 leading-snug">
                                    {toast.description}
                                </p>
                            )}

                            {toast.action && (
                                <button
                                    onClick={() => {
                                        toast.action?.onClick();
                                        removeToast(toast.id);
                                    }}
                                    className="mt-3 text-xs font-semibold text-ph-orange hover:text-ph-orange/80 transition-colors"
                                >
                                    {toast.action.label}
                                </button>
                            )}
                        </div>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="text-gray-500 hover:text-white transition-colors p-0.5"
                        >
                            <X size={14}/>
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
