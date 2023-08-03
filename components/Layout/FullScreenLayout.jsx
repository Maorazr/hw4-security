export default function FullScreenLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header /> {/* replace with your header component */}
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
      <Footer /> {/* replace with your footer component */}
    </div>
  );
}
