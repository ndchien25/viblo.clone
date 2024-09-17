import { useState } from "react";

interface ToolTipProps {
  id: string;
  content: string;
  children: React.ReactNode;
}

export const ToolTip: React.FC<ToolTipProps> = ({ id, content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          id={id}
          role="tooltip"
          className="absolute z-10 whitespace-nowrap p-2 text-sm font-xs text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700"
          style={{ top: "110%", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}
        >
          {content}
          <div
            className="absolute w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-gray-900 dark:border-b-gray-700"
            style={{ top: "-5px", left: "50%", transform: "translateX(-50%)" }}  // Mũi tên bên dưới
          ></div>
        </div>
      )}
    </div>
  )
}