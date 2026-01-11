import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black" style={{ backgroundImage: "url('/images/home.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <main className="grid h-dvh place-items-center p-10">
        <div className="max-w-5xl text-white text-center bg-green-950 rounded gap-3 flex flex-col">
          <h1 className="text-4xl font-bold mt-3 mx-3">Computer&apos;s Repair Shop</h1>
          <address className="">123 Main St, Anytown, USA</address>
          <Link href="tel:+1234567890" className=" hover:underline">
            +123 456 7890
          </Link>
          <p className="font-bold">Open 24/7</p>
          <p><span className="font-bold">Email:</span> info@example.com</p>
          <p className="mb-3"><span className="font-bold">Website:</span> www.example.com</p>
        </div>
      </main>

    </div >
  );
}
