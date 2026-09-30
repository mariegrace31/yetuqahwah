export default function PortalLayout({ children }) {
  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-4 text-yq_black md:px-8">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}
