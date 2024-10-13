/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useReferenceDocument } from "../../hooks/useReferenceDocument";
import { useSession } from "next-auth/react";
import Master from "@/components/Navigation/Master";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";

function ListDocument() {
  const { data: session } = useSession() as { data: any };
  const { dataListDoc } = useReferenceDocument(session?.accessToken);

  // State untuk menyimpan kata kunci pencarian
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State untuk menyimpan tanggal filter
  const [startDate, setStartDate] = useState<string>("");

  // State untuk menyimpan halaman saat ini dan jumlah dokumen per halaman
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [documentsPerPage] = useState<number>(7); // Menentukan jumlah dokumen per halaman

  // Fungsi untuk menangani perubahan pada input pencarian
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Fungsi untuk menangani perubahan tanggal
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(event.target.value);
  };

  // Fungsi untuk memfilter dokumen berdasarkan tanggal
  const filterByDate = (docDate: string) => {
    const docCreatedAt = new Date(docDate).getTime();
    const start = startDate ? new Date(startDate).getTime() : null;

    if (start) {
      return docCreatedAt >= start;
    } else {
      return true;
    }
  };

  // Format tanggal ke dd/mm/yyyy
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Filter dokumen berdasarkan kata kunci pencarian dan tanggal
  const filteredDocuments = dataListDoc?.data
    .filter((doc: any) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((doc: any) => filterByDate(doc.createdAt));

  // Menentukan dokumen yang akan ditampilkan berdasarkan halaman aktif
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments?.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  // Fungsi untuk mengganti halaman
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Hitung total halaman
  const totalPages = Math.ceil(filteredDocuments?.length / documentsPerPage);

  return (
    <Master title="Daftar Dokumen">
      <div className="flex flex-col max-w-7xl mx-auto h-full items-center justify-center py-10">
        <h2 className="text-2xl font-semibold mb-6 text-green-600">
          Daftar Dokumen Anda
        </h2>

        {/* Input Pencarian dan Filter Tanggal */}
        <div className="my-4 flex w-full justify-start gap-4 items-center">
          <Button
            color="green"
            className="text-white"
            onClick={() => console.log("Add Document")}
          >
            Tambah Dokumen
          </Button>

          {/* Input Pencarian Berdasarkan Judul */}
          <div className="w-full max-w-md">
            <Input
              crossOrigin={undefined}
              type="text"
              label="Cari berdasarkan judul dokumen"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mb-4"
              placeholder="Masukkan judul dokumen"
            />
          </div>

          {/* Filter Tanggal: Dari Tanggal */}
          <div>
            <Input
              crossOrigin={undefined}
              type="date"
              label="Dari Tanggal"
              value={startDate}
              onChange={handleStartDateChange}
              className="mb-4"
            />
          </div>
        </div>

        {/* Daftar Dokumen */}
        <div className="w-full max-w-7xl">
          <Card className="shadow-lg">
            <CardBody>
              <table className="table-auto w-full bg-white shadow-lg rounded-lg">
                <thead className="bg-gray-100">
                  <tr className="text-gray-600 text-left">
                    <th className="p-4">No</th>
                    <th className="p-4">Judul</th>
                    <th className="p-4">Tanggal Unggah</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocuments?.map((doc: any, index: number) => (
                    <tr key={doc.id} className="border-b border-gray-200">
                      <td className="p-4">
                        {indexOfFirstDocument + index + 1}
                      </td>
                      <td className="p-4">{doc.title}</td>
                      <td className="p-4">{formatDate(doc.createdAt)}</td>
                      <td className="p-4">
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL}/${doc.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Lihat Dokumen
                        </a>
                      </td>
                    </tr>
                  ))}

                  {/* Menampilkan pesan jika tidak ada hasil pencarian */}
                  {currentDocuments?.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center text-gray-500 py-4"
                      >
                        Tidak ada dokumen yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Paginasi */}
              <div className="flex justify-center mt-4">
                <nav>
                  <ul className="inline-flex items-center -space-x-px">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNumber) => (
                        <li key={pageNumber}>
                          <button
                            onClick={() => paginate(pageNumber)}
                            className={`px-3 py-2 border ${
                              pageNumber === currentPage
                                ? "bg-green-500 text-white"
                                : "bg-white text-gray-700"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        </li>
                      )
                    )}
                  </ul>
                </nav>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Master>
  );
}

export default ListDocument;
