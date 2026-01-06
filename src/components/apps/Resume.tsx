import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const RESUME_URL = "/files/hossein-moradi-frontend-engineer.pdf";

export const Resume = () => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [scale, setScale] = useState(1.0);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setContainerWidth(entry.contentRect.width);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setIsLoading(false);
    }

    const zoomIn = () => setScale(prev => Math.min(prev + 0.1, 2));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.1, 0.5));

    return (
        <div className="flex flex-col h-full bg-gray-500/10 dark:bg-black/40 backdrop-blur-sm">

            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 bg-white dark:bg-[#1d1f27] border-b border-gray-200 dark:border-white/5 shadow-sm z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <button onClick={zoomOut} className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-600 dark:text-gray-300 transition-colors">
                        <ZoomOut size={16} />
                    </button>
                    <span className="text-xs font-mono text-gray-500 w-12 text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button onClick={zoomIn} className="p-1.5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-600 dark:text-gray-300 transition-colors">
                        <ZoomIn size={16} />
                    </button>
                </div>

                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 hidden sm:block">
                    resume.pdf
                </h3>

                <a
                    href={RESUME_URL}
                    download
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                >
                    <Download size={14} />
                    <span>Save File</span>
                </a>
            </div>

            {/* PDF Viewer Area */}
            <div
                ref={containerRef}
                className="flex-1 overflow-auto p-4 md:p-8 relative"
            >
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                    </div>
                )}

                <div className="min-w-min min-h-min flex justify-center">
                    <Document
                        file={RESUME_URL}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={null}
                        className="shadow-2xl mx-auto"
                    >
                        {Array.from(new Array(numPages), (_, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                pageNumber={index + 1}
                                width={containerWidth ? Math.min(containerWidth - 40, 800) : undefined}
                                scale={scale}
                                className="mb-4 shadow-lg border border-gray-200 dark:border-white/5 bg-white block"
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                            />
                        ))}
                    </Document>
                </div>
            </div>
        </div>
    );
};
