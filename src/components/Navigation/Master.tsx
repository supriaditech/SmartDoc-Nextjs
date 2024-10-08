import StickyNavbar from "./StikyNavbar";

export interface MasterProps {
  children: React.ReactNode;
  title: string;
  userType?: string;
}

export default function Master({ children, title }: MasterProps) {
  return (
    <div>
      <StickyNavbar title={title}>{children}</StickyNavbar>
    </div>
  );
}
