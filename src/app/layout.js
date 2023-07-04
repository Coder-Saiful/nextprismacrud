'use client'

import { useEffect } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import 'bootstrap/dist/css/bootstrap.min.css'
import './globals.css'
import './style.css'
import MainNav from '@/components/Layout/MainNav';

export default function RootLayout({ children }) {
  useEffect(() => {
    require ('bootstrap/dist/js/bootstrap.js')
  }, []);
  return (
    <html lang="en">
      <body>
        <MainNav />
        {children}
      </body>
    </html>
  )
}
