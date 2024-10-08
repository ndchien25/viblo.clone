import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState('VN');

  const changeLanguage = (language:string) => {
    setSelectedLanguage(language);
    console.log("Language changed to:", language);
  };
  const getImage = (language: string) => {
    switch (language) {
      case 'VN':
        return 'http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg'; // Replace with the actual path
      case 'EN':
        return 'http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg'; // Replace with the actual path
      case 'FR':
        return 'http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg'; // Replace with the actual path
      default:
        return 'http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg'; // Fallback flag image
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className="items-center text-black space-x-2 bg-white hover:bg-gray-100">
          <img
            src={getImage(selectedLanguage)}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-semibold text-sm">{selectedLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => changeLanguage('VN')}>
          <div className="flex items-center space-x-2">
            <img
              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg"
              alt="VN"
              className="w-6 h-6 rounded-full"
            />
            <span className="font-semibold">VN - Vietnamese</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('EN')}>
          <div className="flex items-center space-x-2">
            <img
              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg"
              alt="EN"
              className="w-6 h-6 rounded-full"
            />
            <span className="font-semibold">EN - English</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage('FR')}>
          <div className="flex items-center space-x-2">
            <img
              src="http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg"
              alt="FR"
              className="w-6 h-6 rounded-full"
            />
            <span className="font-semibold">FR - French</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
