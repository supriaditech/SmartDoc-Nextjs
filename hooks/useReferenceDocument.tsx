/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Api from "../service/Api";
import useSWR from "swr";

interface UploadDocumentResponse {
  meta: {
    code: number;
    status: string;
    message: string;
  };
  data: any;
}

const fetcher = async (url: string, token: string) => {
  const api = new Api();
  api.url = url;
  api.auth = true;
  api.body = {};
  api.token = token;
  return api.call();
};

const useReferenceDocument = (token: string) => {
  console.log("============", token);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<UploadDocumentResponse | null>(null);

  //   list dokument
  const {
    data: dataListDoc,
    error: errorListDoc,
    mutate,
  } = useSWR(
    token ? ["/reference-documents/list", token] : null,
    ([url, token]) => fetcher(url, token)
  );

  const uploadDocument = async (file: File, title: string, userId: number) => {
    setLoading(true);
    setError(null);

    // Buat instance API baru
    const api = new Api();
    api.url = "/reference-documents/upload"; // URL untuk upload
    api.type = "multipart"; // Pastikan tipe multipart
    api.auth = true;
    api.token = token;
    api.body = new FormData(); // Gunakan FormData untuk multipart

    // Tambahkan data ke FormData
    api.body.append("file", file);
    api.body.append("title", title);
    api.body.append("userId", userId.toString());
    // api.body.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });

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
    dataListDoc,
    errorListDoc,
    mutate,
  };
};

export { useReferenceDocument };
