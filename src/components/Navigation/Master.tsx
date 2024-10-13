import StickyNavbar from "./StikyNavbar";

export interface MasterProps {
  children: React.ReactNode;
  title: string;
  userType?: string;
}

export default function Master({ children, title }: MasterProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <StickyNavbar title={title}>
        <div>{children}</div>
      </StickyNavbar>
    </div>
  );
}
