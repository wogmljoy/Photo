
import React, { useCallback } from 'react';

interface UploaderProps {
  onUpload: (base64: string) => void;
  preview: string | null;
}

export const Uploader: React.FC<UploaderProps> = ({ onUpload, preview }) => {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [onUpload]);

  return (
    <div className="w-full">
      <label className="block w-full cursor-pointer">
        <div className={`
          border-2 border-dashed rounded-2xl p-8 transition-all duration-300
          flex flex-col items-center justify-center text-center
          ${preview ? 'border-blue-300 bg-blue-50' : 'border-slate-300 hover:border-blue-400 bg-white'}
        `}>
          {preview ? (
            <div className="relative group">
              <img src={preview} alt="Original" className="w-48 h-48 object-cover rounded-xl shadow-md" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                <p className="text-white text-sm font-medium">Change Photo</p>
              </div>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-cloud-arrow-up text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-slate-800">Upload your photo</h3>
              <p className="text-sm text-slate-500 mt-2">Drag and drop or click to select a file</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG or WebP (Max 10MB)</p>
            </>
          )}
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </div>
      </label>
    </div>
  );
};
