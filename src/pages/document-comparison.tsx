/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDocumentComparison } from "../../hooks/useDocumentComparison";
import { useSession } from "next-auth/react";
import Master from "@/components/Navigation/Master";

function DocumentComparison() {
  const { data: session } = useSession() as { data: any };
  const { compareDocument, loading, error, results } = useDocumentComparison(
    session?.accessToken
  );
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  // Fungsi untuk menangani drop file dari react-dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0]; // Ambil file pertama
    setFile(uploadedFile);
    setFileName(uploadedFile.name); // Set nama file yang dipilih
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [], "text/plain": [] }, // Terima hanya PDF dan TXT
    maxSize: 10 * 1024 * 1024, // Maksimal 10 MB
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      await compareDocument(file);
    } else {
      alert("Pilih dokumen terlebih dahulu.");
    }
  };

  return (
    <Master title="Upload Dokumen">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-green-600 mb-4 text-center">
            Upload Dokumen Referensi Anda
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Unggah dokumen dengan mudah dan aman.
          </p>

          {/* Drag and Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              isDragActive ? "border-green-500" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            {fileName ? (
              <p className="text-green-600">{fileName}</p>
            ) : isDragActive ? (
              <p>Drop dokumen Anda di sini...</p>
            ) : (
              <p>
                Drag dan drop file di sini, atau{" "}
                <span className="text-green-500">klik untuk memilih file</span>
              </p>
            )}
            <p className="text-sm text-gray-400 mt-2">
              PDF, TXT (Maksimal 10MB)
            </p>
          </div>

          {/* Tombol Unggah */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg mt-4 hover:bg-green-700 transition duration-300"
          >
            {loading ? "Memproses..." : "Unggah Dokumen"}
          </button>

          {/* Pesan Error */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </div>

        {/* Tampilkan Hasil */}
        {results.length > 0 && (
          <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-green-600 mb-4">
              Hasil Perbandingan
            </h2>
            <ul className="space-y-2">
              {results.map((result, index) => (
                <li key={result.id} className="flex justify-between">
                  <span>
                    {index + 1}. {result.title}
                  </span>
                  <span>{result.similarity.toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Master>
  );
}

export default DocumentComparison;
