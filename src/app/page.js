import Header from "../components/Header";
import FileUpload from "../components/FlieUpload";
import CoordinateSystemSelector from "../components/CoordinateSystemSelector";
import DownloadExample from "../components/DownloadExample";
import CsvSpecification from "../components/CsvSpecification";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen max-h-screnn w-screen  flex flex-col justify-between p-4">
      <Header />
      <main className="flex w-full  justify-between ">
        <div className="w-[80%] flex ">
            <FileUpload />
          <CoordinateSystemSelector />
        </div>
          
        
        <div className="w-[30%] flex flex-col max-w-[300px]">

          <DownloadExample />
          <CsvSpecification />

        </div>

      </main>
      <Footer />
    </div>
  );
}
