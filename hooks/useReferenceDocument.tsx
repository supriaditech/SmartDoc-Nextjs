/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Api from "../service/Api";

interface UploadDocumentResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: any;
}

const useReferenceDocument = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<UploadDocumentResponse | null>(null);

  const uploadDocument = async (file: File, title: string, userId: number) => {
    setLoading(true);
    setError(null);

    // Buat instance API baru
    const api = new Api();
    api.url = "/reference-documents/upload"; // URL untuk upload
    api.type = "multipart"; // Pastikan tipe multipart
    api.body = new FormData(); // Gunakan FormData untuk multipart

    // Tambahkan data ke FormData
    api.body.append("file", file);
    api.body.append("title", title);
    api.body.append("userId", userId.toString());

    try {
      // Panggil API
      const result = await api.call();
      console.log(result);
      setResponse(result);
    } catch (err) {
      setError("Failed to upload document.");
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadDocument,
    loading,
    error,
    response,
  };
};

export { useReferenceDocument };
