export default function TaskCard() {
  return (
    <div className="border border-toStart p-4 rounded-lg h-[217px] w-[381px] flex flex-col justify-around">
      <div className="flex flex-row justify-between  items-center">
        <div className="flex flex-row gap-2">
          <div className="text-xs px-2 text-toStart border border-toStart rounded-lg content-center">
            საშუალო
          </div>
          <div className="text-xs  px-4 h-[24px]   bg-design text-white rounded-full flex items-center">
            დიზაინი
          </div>
        </div>
        <p className="text-xs">22 იანვ, 2022</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-semibold">Redberry-ს საიტის ლენდინგის დიზაინი</p>
        <p className="text-sm">
          შექმენი საიტის მთავარი გვერი, რომელიც მოიცავს მთავარ სექციებს
          ნავიგაციას.
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <p>kakaa</p>
        <p>kakaa</p>
      </div>
    </div>
  );
}
