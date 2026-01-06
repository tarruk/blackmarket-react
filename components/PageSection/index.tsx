export default function PageSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative container z-10 flex flex-col gap-20 max-w-7xl mx-auto">
      {children}
    </div>
  );
}
