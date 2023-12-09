"use client";
import { useState } from "react";
import problem from "@/assets/test.jpg";
import Image from "next/image";

export default function Home() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleLoadingComplete = () => {
    setImagesLoaded(true);
  };

  return (
    <div className="container mx-auto absolute left-1/2 -translate-x-1/2  grid items-center justify-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-[400px]:px-4">
      {[1, 2, 3, 4].map((index) => (
        <div key={index} className="card max-w-xs bg-base-100 shadow-xl">
          <figure>
            <Image
              src={problem}
              width={300}
              height={300}
              alt="Shoes"
              onLoadingComplete={handleLoadingComplete}
            />
          </figure>

          {!imagesLoaded && (
            <div className="flex flex-col gap-4 w-52">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          )}

          {imagesLoaded && (
            <div className="card-body">
              <h2 className="card-title">مبنى الشئون القانونية والديزل</h2>
              <p>
                سقف غرفة الكهرباء يحتاج إلى ترميم منعا لتسريب المياه إلى غرفة
                الكهرباء
              </p>
              <div className="card-actions justify-start">
                <button className="btn btn-primary text-white">
                  المزيد...
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
