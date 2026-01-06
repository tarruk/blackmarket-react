export default function AdvertisementCard() {
  return (
    <div className="flex sm:flex-row flex-col sm:h-[300px] h-[320px] rounded-xl overflow-hidden bg-black">
      <img
        className="sm:h-full h-2/3 bg-cover bg-center sm:w-2/3 w-full"
        src="/images/adv_img.png"
      />
      <div className="sm:w-1/3 w-full h-full flex flex-col sm:justify-center justify-start sm:px-8 gap-4 shrink-0 p-5">
        <h2 className="sm:text-xl text-sm font-semibold leading-tight text-white">
          Check our new and restored furniture
        </h2>
        <p className="text-sm text-white/90">
          Shop today and receive a special 10% discount!
        </p>
      </div>
    </div>
  );
}
