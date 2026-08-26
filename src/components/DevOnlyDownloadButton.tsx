import React, { useState, useEffect } from 'react';
import { Download, CheckCircle2, Loader2 } from 'lucide-react';

export const DevOnlyDownloadButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    // Only show in AI Studio preview / localhost / dev server
    // NEVER show when opened locally via file:/// or in other environments
    if (typeof window !== 'undefined') {
      const isFileProtocol = window.location.protocol === 'file:';
      const hostname = window.location.hostname || '';
      const isDevHost = 
        hostname.includes('run.app') || 
        hostname.includes('localhost') || 
        hostname.includes('127.0.0.1') ||
        Boolean((import.meta as any).env?.DEV);

      if (!isFileProtocol && isDevHost) {
        setIsVisible(true);
      }
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleDownload = async () => {
    try {
      setLoading(true);
      
      let htmlContent = '';
      
      // 1. Fetch pre-built standalone HTML file
      try {
        const res = await fetch('./standalone-index.html', { cache: 'no-store' });
        if (res.ok) {
          const text = await res.text();
          if (text && text.includes('<html') && text.includes('The Revenge')) {
            htmlContent = text;
          }
        }
      } catch {
        // Continue to fallback
      }

      // 2. Fetch /dist/index.html or /index.html
      if (!htmlContent) {
        try {
          const res = await fetch('./index.html', { cache: 'no-store' });
          if (res.ok) {
            const text = await res.text();
            if (text && text.includes('<html')) {
              htmlContent = text;
            }
          }
        } catch {
          // Continue to fallback
        }
      }

      // 3. Fallback: serialize DOM
      if (!htmlContent) {
        htmlContent = `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
      }

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(url), 4000);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 5000);
    } catch (e) {
      console.error('Error downloading index.html:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside
      aria-label="Studio Panel"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 pointer-events-auto"
    >
      <button
        id="dev-only-download-index-btn"
        onClick={handleDownload}
        disabled={loading}
        title="Панель разработчика: Скачать готовый автономный index.html (видна только в AI Studio)"
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-jakarta font-bold text-xs shadow-[0_0_25px_rgba(255,0,0,0.6)] hover:shadow-[0_0_35px_rgba(255,0,0,0.8)] border border-red-400/50 transition-all duration-300 active:scale-95 cursor-pointer backdrop-blur-md"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : downloaded ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <Download className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
        )}

        <div className="flex flex-col text-left">
          <span className="leading-tight">
            {downloaded ? 'Файл скачан!' : 'Скачать index.html'}
          </span>
          <span className="text-[9px] font-mono text-red-200/80 font-normal">
            Только для вас (AI Studio)
          </span>
        </div>
      </button>
    </aside>
  );
};
