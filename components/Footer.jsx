import { Heart } from 'lucide-react'
import { Send } from 'lucide-react'
import React from 'react'
import data from "@/data.json";

const footer = data.footer;

export const Footer = () => {
  return (
 <footer className="border-t border-white/10 pt-16 pb-8 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent text-white font-heading font-bold text-xl flex items-center justify-center transform -skew-x-12">
                  {data.logoLetter}
                </div>
                <span className="font-heading font-bold text-xl tracking-wider">{data.siteName}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {footer.description}
              </p>
              <div className="flex gap-4">
                {footer.socialLinks.map((social) => (
                  <a key={social.platform} href={social.href} className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-accent transition-colors">
                    <img src={social.icon} alt={social.platform} width="18" height="18" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-accent">QUICK LINKS</h4>
              <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                {footer.quickLinks.map((link) => (
                  <li key={link.label}><a href={link.href} className="hover:text-white transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-accent">RESOURCES</h4>
              <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                {footer.resources.map((link) => (
                  <li key={link.label}><a href={link.href} className="hover:text-white transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-accent">{footer.newsletter.heading}</h4>
              <p className="text-gray-400 text-sm mb-4">{footer.newsletter.description}</p>
              <div className="flex relative">
                <input 
                  type="email" 
                  placeholder={footer.newsletter.placeholder} 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 pr-12 text-sm focus:outline-none focus:border-accent transition-colors text-white"
                />
                <button className="absolute right-1 top-1 bottom-1 w-10 bg-accent rounded-md flex items-center justify-center hover:bg-red-700 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500">
            <p>{footer.copyright}</p>
            <p className="mt-2 md:mt-0 flex items-center gap-1">Designed with <Heart size={12} className="text-accent" /> by Art Meisters Team</p>
          </div>
        </div>
      </footer>
  )
}
