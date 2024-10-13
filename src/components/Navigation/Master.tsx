import StickyNavbar from "./StikyNavbar";

export interface MasterProps {
  children: React.ReactNode;
  title: string;
  userType?: string;
}

export default function Master({ children, title }: MasterProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <StickyNavbar title={title}>
        <div>{children}</div>
        <footer className="w-full text-center text-gray-600 mt-16">
          <p className="mb-2">© 2024 Tempat Belajar. All Rights Reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="/privacy-policy" className="hover:underline">
              Kebijakan Privasi
            </a>
            <a href="/terms-of-service" className="hover:underline">
              Ketentuan Layanan
            </a>
            <a href="/contact" className="hover:underline">
              Hubungi Kami
            </a>
          </div>
        </footer>
      </StickyNavbar>
    </div>
  );
}
