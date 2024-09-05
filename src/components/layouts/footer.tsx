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
              <li><Link to="/">Bài viết</Link></li>
              <li><Link to="/">Tổ chức</Link></li>
              <li><Link to="/">Câu hỏi</Link></li>
              <li><Link to="/">Tags</Link></li>
              <li><Link to="/">Videos</Link></li>
              <li><Link to="/">Tác giả</Link></li>
              <li><Link to="/">Thảo luận</Link></li>
              <li><Link to="/">Đề xuất hệ thống</Link></li>
              <li><Link to="/">Công cụ</Link></li>
              <li><Link to="/">Machine Learning</Link></li>
              <li><Link to="/">Trạng thái hệ thống</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <p className="mb-6 uppercase font-bold">dịch vụ</p>
            <div className="flex flex-wrap">
              <ul className="grid gap-3">
                <li className="flex items-center">
                  <a
                    href="https://viblo.asia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-blue-500 transition"
                  >
                    <img
                      src="/favicon.ico"
                      alt="Viblo"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    Viblo
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="https://viblo.asia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-blue-500 transition"
                  >
                    <img
                      src="https://viblo.asia/images/viblo-code.png"
                      alt="Viblo"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    Viblo Code
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="https://viblo.asia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-blue-500 transition"
                  >
                    <img
                      src="https://viblo.asia/images/viblo-ctf.png"
                      alt="Viblo"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    Viblo CTF
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="https://viblo.asia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-blue-500 transition"
                  >
                    <img
                      src="https://viblo.asia/images/viblo-cv.png"
                      alt="Viblo"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    Viblo CV
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="https://viblo.asia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-blue-500 transition"
                  >
                    <img
                      src="https://viblo.asia/images/viblo-learn.png"
                      alt="Viblo"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    Viblo Learning
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="https://viblo.asia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-blue-500 transition"
                  >
                    <img
                      src="https://viblo.asia/images/viblo-partner.png"
                      alt="Viblo"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    Viblo Partner
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="https://viblo.asia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-blue-500 transition"
                  >
                    <img
                      src="https://viblo.asia/images/viblo-battle.png"
                      alt="Viblo"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    Viblo Battle
                  </a>
                </li>
                <li className="flex items-center">
                  <a
                    href="https://viblo.asia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:text-blue-500 transition"
                  >
                    <img
                      src="https://viblo.asia/images/viblo-interview.ico"
                      alt="Viblo"
                      width="24"
                      height="24"
                      className="mr-2"
                    />
                    Viblo Interview
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <p className="mb-6 uppercase font-bold">ứng dụng di động</p>
            <div className="flex mb-2.5">
              {/* Column 1: Google Play Badge */}
              <div className="flex flex-wrap justify-between md:flex-col mb-4 md:mb-0">
                <a
                  href="https://play.google.com/store/apps/details?id=com.framgia.viblo.android.prod"
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
                </a>
                {/* Column 2: App Store Badge */}
                <a
                  href="https://itunes.apple.com/us/app/viblo/id1365286437"
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
                </a>
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
              <li className="inline-block">
                <a href="https://www.facebook.com/viblo.asia/" target="_blank" rel="noopener">
                  <Facebook />
                </a>
              </li>
              <li className="inline-block">
                <a href="https://github.com/viblo-asia/" target="_blank" rel="noopener">
                  <Github />
                </a>
              </li>
              <li className="inline-block">
                <a href="https://chrome.google.com/webstore/detail/viblos-news-feed/mliahmjgdpkkicelofhbhgiidgljijmj" target="_blank" rel="noopener">
                  <Chrome />
                </a>
              </li>
              <li className="inline-block">
                <a href="https://atom.io/packages/viblo" target="_blank" rel="noopener">
                  <Atom />
                </a>
              </li>
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
              <li className="mb-2">
                <a href="https://about.viblo.asia/" target="_blank" rel="noopener">
                  Về chúng tôi
                </a>
              </li>
              <li className="mb-2 mx-2">
                <a href="/feedback">
                  Phản hồi
                </a>
              </li>
              <li className="mb-2 mx-2">
                <a href="/helps">
                  Giúp đỡ
                </a>
              </li>
              <li className="mb-2 mx-2">
                <a href="/faq">
                  FAQs
                </a>
              </li>
              <li className="mb-2 mx-2">
                <a href="/rss-channels">
                  RSS
                </a>
              </li>
              <li className="mb-2 mx-2">
                <a href="/terms/vi_term">
                  Điều khoản
                </a>
              </li>
              <li className="mb-2 mx-2">
                <a href="https://www.dmca.com/Protection/Status.aspx?ID=41818fcd-5a60-4504-867a-38fde606354e&amp;refurl=https://viblo.asia/followings"
                  title="DMCA.com Protection Status"
                  target="_blank"
                  rel="noopener"
                  className="dmca-badge"
                >
                  <img
                    src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-07.png?ID=41818fcd-5a60-4504-867a-38fde606354e"
                    alt="DMCA.com Protection Status"
                    width="100"
                    height="20"
                    className="w-24 h-5"
                  />
                </a>
                <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"></script>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
