import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '@/assets/img/logo_viblo.svg'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { sidebarItem } from "@/constants/sidebarAdmin";
import { cn } from "@/lib/utils";

const SideBar: React.FC = () => {
  const location = useLocation()
  const segment = location.pathname.split('/')[2]

  const getOpenAccordionValue = () => {
    for (let groupIndex = 0; groupIndex < sidebarItem.length; groupIndex++) {
      const group = sidebarItem[groupIndex]
      for (let itemIndex = 0; itemIndex < group.items.length; itemIndex++) {
        const item = group.items[itemIndex]
        if (item.active.includes(segment)) {
          return `item-${groupIndex}-${itemIndex}`
        }
      }
    }
  }
  const defaultValue = getOpenAccordionValue()
  return (
    <aside className="admin-sidebar w-60 bg-[#111c43] fixed h-full">
      <div className="main-sidebar-header w-60 p-3.5 z-10 h-14 text-center border-solid border-b">
        <Link className="inline-block" to="/admin">
          <img className="h-8" src={logo} />
        </Link>
      </div>
      <div className="main-header">
        {sidebarItem.map((group, index) => (
          <div key={index}>
            <div className="menu-catogory px-6 py-3 text-white text-sm font-semibold tracking-wider opacity-50">{group.label}</div>
            <Accordion type="single" collapsible className="px-3 border-none" defaultValue={defaultValue}>
              {group.items.map((item, itemIndex) => (
                <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`} className="rounded-lg ">
                  <AccordionTrigger className={cn("hover:no-underline p-3", item.active.includes(segment) ? "text-white bg-white bg-opacity-5" : 'text-[#a3aed1]')}>
                    <div className={`menu-lable flex flex-1 text-center ${item.active.includes(segment) ? "text-white" : ''}`}>
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-0">
                    <ul>
                      {item.links.map((link, linkIndex) => (
                        <li className="pl-6" key={linkIndex}>
                          <Link className="text-[#a3aed1] text-[13px] block relative px-6 hover:bg-white hover:bg-opacity-5 hover:text-white  rounded-lg py-2" to={link.to}>
                            <span>{link.title}</span>
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-1 border border-solid border-primary rounded-full border-white"></span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
