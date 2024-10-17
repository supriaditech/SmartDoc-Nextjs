/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import useSWR from "swr";
import Api from "../service/Api";

// Interface untuk respons perbandingan dokumen
interface ComparisonResult {
  id: number;
  title: string;
  similarity: number;
}

// Custom hook untuk perbandingan dokumen
const useDocumentComparison = (token: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<ComparisonResult[]>([]);

  // Fungsi untuk upload dan membandingkan dokumen
  const compareDocument = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("uploaded_file", file);

    try {
      const api = new Api();
      api.url = "/document-comparison/compare"; // Endpoint NestJS
      api.type = "multipart";
      api.auth = true;
      api.token = token;
      api.body = formData;

      const response = await api.call();
      console.log(response);
      setResults(response.results || []);
    } catch (err) {
      setError("Gagal membandingkan dokumen.");
    } finally {
      setLoading(false);
    }
  };

  return { compareDocument, loading, error, results };
};

export { useDocumentComparison };
