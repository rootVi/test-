'use client'
import Slider from "../_components/slider";


export default function Home() {
  return (
    <>
    
      <div
        style={{ backgroundImage: "url('/home.png')" }}
        className="min-h-screen flex bg-no-repeat bg-cover bg-center items-center"
      >
        <div className="mx-auto">
          <h1 className="text-7xl text-white  font-semibold font-serif">
            Kagen
          </h1>

          <p className="text-base text-white pt-8 text-center font-serif">
            Bir Dünya Markası
          </p>
        </div>
      </div>
      <Slider />
    </>
  );
}
