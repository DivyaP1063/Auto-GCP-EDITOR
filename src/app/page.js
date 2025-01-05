import Header from "../components/Header";
import FileUpload from "../components/FlieUpload";
import CoordinateSystemSelector from "../components/CoordinateSystemSelector";
import DownloadExample from "../components/DownloadExample";
import CsvSpecification from "../components/CsvSpecification";
import Footer from "../components/Footer";

export default function Home() {
  return (

    <div className="min-h-screen max-h-screen min-w-screen max-w-screen flex flex-col justify-between p-1 ">
    <div>
      <Header />
      <main className=" flex flex-col justify-between mt-3 ">
      <div className="flex w-full gap-x-[50px] ">
        <div className="w-[70%] flex flex-col ">
          <div className="w-full flex gap-x-4 ">
            <FileUpload />
            <CoordinateSystemSelector />
          </div>
        </div>

        <div className="w-[30%] flex flex-col">
          <DownloadExample />
          <CsvSpecification />
        </div>
      </div>
      </main>
    </div>
      


      <footer className=" border-t-2 w-full p-1 ">
      <Footer />
      </footer>
       

      
    </div>
  );
}
