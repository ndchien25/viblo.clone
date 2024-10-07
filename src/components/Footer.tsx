import { Atom, Chrome, Facebook, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full self-end bg-[#0b1a33] text-[#dbe3e8]">
      <div className="container pt-5">
        <div className="flex flex-wrap justify-between">
          {/* First Column */}
          <div className="w-full md:w-1/3 px-4">
            <p className="mb-6 uppercase font-bold">tài nguyên</p>
            <ul className="grid grid-cols-2 gap-3">
              {["Bài viết", "Tổ chức", "Câu hỏi", "Tags", "Videos", "Tác giả", "Thảo luận", "Đề xuất hệ thống", "Công cụ", "Machine Learning", "Trạng thái hệ thống"].map(item => (
                <li key={item}>
                  <Link to="/">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <p className="mb-6 uppercase font-bold">dịch vụ</p>
            <div className="flex flex-wrap">
              <ul className="grid gap-3">
                {[
                  { name: "Viblo", imgSrc: "/favicon.ico", link: "https://viblo.asia" },
                  { name: "Viblo Code", imgSrc: "https://viblo.asia/images/viblo-code.png", link: "https://viblo.asia" },
                  { name: "Viblo CTF", imgSrc: "https://viblo.asia/images/viblo-ctf.png", link: "https://viblo.asia" },
                  { name: "Viblo CV", imgSrc: "https://viblo.asia/images/viblo-cv.png", link: "https://viblo.asia" },
                  { name: "Viblo Learning", imgSrc: "https://viblo.asia/images/viblo-learn.png", link: "https://viblo.asia" },
                  { name: "Viblo Partner", imgSrc: "https://viblo.asia/images/viblo-partner.png", link: "https://viblo.asia" },
                  { name: "Viblo Battle", imgSrc: "https://viblo.asia/images/viblo-battle.png", link: "https://viblo.asia" },
                  { name: "Viblo Interview", imgSrc: "https://viblo.asia/images/viblo-interview.ico", link: "https://viblo.asia" }
                ].map(service => (
                  <li className="flex items-center" key={service.name}>
                    <Link
                      to={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white hover:text-blue-500 transition"
                    >
                      <img src={service.imgSrc} alt={service.name} width="24" height="24" className="mr-2" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <p className="mb-6 uppercase font-bold">ứng dụng di động</p>
            <div className="flex mb-2.5">
              {/* Column 1: Google Play Badge */}
              <div className="flex flex-wrap justify-between md:flex-col mb-4 md:mb-0">
                <Link
                  to="https://play.google.com/store/apps/details?id=com.framgia.viblo.android.prod"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    alt="Get it on Google Play"
                    src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png"
                    width="130"
                    height="42"
                    className="w-[150px] h-auto"
                  />
                </Link>
                {/* Column 2: App Store Badge */}
                <Link
                  to="https://itunes.apple.com/us/app/viblo/id1365286437"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    alt="Download on the App Store"
                    src="https://viblo.asia/_nuxt/img/app-store-badge.8c4986ee4828b47d16f5cd694ef065f2.svg"
                    width="646"
                    height="250"
                    className="w-[130px] h-auto m-[10px]"
                  />
                </Link>
              </div>
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHwAAAB8CAIAAAAkfEPpAAACEklEQVR42u3aUY6DMAwFQO5/6e4JKhXF7yUL488KBZhEcm1zfUQ9LgTQoYsC+hWIb+t/faCb19x9hp9Q0g7QoUOHXkZfShRDL/wLxMp9p9a5vT506NChb0RPJ8yVNaeSc9MBOnTo0N+CvgKdKI6gQ4cOHfoMysrzJBpz0KFDh/4E9EQimmqcJYqmR3UZoUOHDn1jgjrt98d+DQAdOvTHozcjsZGJxlzk3aFDhw69jN5Mqol10odjrDiCDh069DL6yjXpYfTUvarFIHTo0KEX0KcGAlMD6MSgIz0Qv10cQYcOHXoBfaphlG5UNRPs2AGFDh069I3oTaxE46xZfI19DQAdOnTog+iJwmQlwSaKo+ahgQ4dOvTT0acKimaynTpMS4cAOnTo0AvozRdrbmT6cNz+EwEdOnToG9F3DSjSSb45DIEOHTr0NnpiEJwoRtKIiaEKdOjQoZ+Inn7QxMZMDVjGng06dOjQD0FPFDVTiTqNODU0hw4dOvRT0CMNoOKHPitF1timQocOHXoBPR1TELuG6ZGGF3To0KEXvk+fiubQ+YRCb+nfC3To0KGH0BMJMz3QmDociQIQOnTo0E9BTyfM9NAg0fBa2jzo0KFDfxj6rmsSGwkdOnTob0dPI6Ybdo8qjqBDh/4q9PRgYaqQSQ/QoUOHDv2/oqcbQFPJNp14E4cJOnTo0BvoohPQoUMXofgD+J8kMHoXlkcAAAAASUVORK5CYII="
                width="124"
                height="124"
                alt="QR code"
                className="hidden md:block m-1"
              />
            </div>
            <p className="mb-6 uppercase font-bold">Liên kết</p>
            <ul className="flex gap-4">
              {[
                { icon: <Facebook />, link: "https://www.facebook.com/viblo.asia/" },
                { icon: <Github />, link: "https://github.com/viblo-asia/" },
                { icon: <Chrome />, link: "https://chrome.google.com/webstore/detail/viblos-news-feed/mliahmjgdpkkicelofhbhgiidgljijmj" },
                { icon: <Atom />, link: "https://atom.io/packages/viblo" }
              ].map(social => (
                <li className="inline-block" key={social.link}>
                  <Link to={social.link} target="_blank" rel="noopener">
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-wrap py-4">
          <div className="w-full sm:w-4/12 lg:w-5/12 xl:w-6/12">
            <p className="text-sm sm:text-base">
              © 2024 <b>Viblo</b>. All rights reserved.
            </p>
          </div>
          <div className="w-full sm:w-8/12 lg:w-7/12 xl:w-6/12">
            <ul className="list-none flex flex-wrap justify-between">
              {[
                { text: "Về chúng tôi", link: "https://about.viblo.asia/" },
                { text: "Phản hồi", link: "/feedback" },
                { text: "Giúp đỡ", link: "/helps" },
                { text: "FAQs", link: "/faq" },
                { text: "RSS", link: "/rss-channels" },
                { text: "Điều khoản", link: "/terms" },
                { text: "Chính sách", link: "/privacy" }
              ].map(item => (
                <li className="mr-4 text-sm" key={item.text}>
                  <Link to={item.link}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
