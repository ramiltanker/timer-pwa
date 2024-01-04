import Timer from "entities/Timer/ui/Timer";
import { DoYouWantDownloadAppModal } from "features/DoYouWantDownloadAppModal";
import { useEffect } from "react";
import { LOCAL_STORAGE_VISIT_COUNT } from "shared/lib/constants/localstorage/localstorage";
import { Layout } from "shared/ui/Layout";
import { Footer } from "widgets/Footer";
import { Header } from "widgets/Header";

function App() {
  const updateVisitCount = () => {
    let visits = Number(localStorage.getItem(LOCAL_STORAGE_VISIT_COUNT));
    visits = isNaN(visits) ? 1 : visits + 1;
    localStorage.setItem(LOCAL_STORAGE_VISIT_COUNT, visits.toString());
  };

  useEffect(() => {
    updateVisitCount();
  }, []);

  return (
    <Layout>
      <Header />
      <Timer />
      <Footer />
      <DoYouWantDownloadAppModal />
    </Layout>
  );
}

export default App;
