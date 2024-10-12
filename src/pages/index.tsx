import Master from "@/components/Navigation/Master";
import Image from "next/image";
import Link from "next/link";

export default function Index() {
  return (
    <Master title="Beranda">
      <div className="bg-green-50  grid grid-cols-1 place-items-center  py-8 gap-16">
        {/* Main Section */}
        <main className="text-center py-16 px-4">
          <h1 className="text-4xl font-bold  text-green-600 mb-4">
            Selamat Datang di Tempat Belajar
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Ayo mulai perjalanan belajar Anda dengan mudah!
          </p>

          <Image
            src="/assets/img/welcomeImage.png"
            alt="Learning Illustration"
            width={600}
            height={500}
            className="mx-auto"
          />

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Link
              href="/login"
              className="border border-green-600 text-green-600 py-2 px-6 rounded-full hover:bg-green-600 hover:text-white transition-all"
            >
              Mari Coba Check Dokumen Kamu
            </Link>
          </div>
        </main>
      </div>
    </Master>
  );
}
