/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useReferenceDocument } from "../../hooks/useReferenceDocument";
import { useSession } from "next-auth/react";
import { Button, Card, CardBody } from "@material-tailwind/react";
import Master from "@/components/Navigation/Master";

const UploadDocumentComponent = () => {
  const { uploadDocument, loading, error, response } = useReferenceDocument();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const { data: session } = useSession() as { data: any };
  console.log(session);
  const userId = session?.user?.id;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedFile && title && userId) {
      await uploadDocument(selectedFile, title, userId);
    }
  };

  return (
    <Master title="Reference Documents">
      <div className="flex flex-col h-full items-center justify-center py-20 bg-gray-100">
        <Card className="w-full max-w-lg shadow-lg">
          <CardBody>
            <h2 className="text-3xl font-semibold text-center text-green-600">
              Upload Dokumen Referensi Anda
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Unggah dokumen dengan mudah dan aman.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Judul Dokumen
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Masukkan judul dokumen"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pilih File
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  color="green"
                  type="submit"
                  disabled={loading}
                  fullWidth={true}
                >
                  {loading ? "Mengunggah..." : "Unggah Dokumen"}
                </Button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-center text-red-500">{error}</div>
            )}
            {response && (
              <div className="mt-4 text-center text-green-500">
                {response.meta.message}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </Master>
  );
};

export default UploadDocumentComponent;
