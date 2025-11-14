import Footer from "./Footer";
import Navbar from "./Navbar";

function PublicPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-[10.15rem]">
      <Navbar />
      <main className="min-h-screen flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

export default PublicPagesLayout;
