import Header from "./Header";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center">
        <div className="mt-4 mb-10 flex w-11/12  flex-col items-center gap-4 lg:w-4/6">
          {children}
        </div>
      </main>
    </>
  );
}

export default BaseLayout;
