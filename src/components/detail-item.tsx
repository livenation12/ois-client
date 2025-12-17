import React from 'react'

export default function DetailItem({ label, value, applyHoverEffect = false }: { label: string; value: React.ReactNode, applyHoverEffect?: boolean }) {
     return (

          <div className={`flex flex-col lg:flex-row justify-between items-start ${applyHoverEffect ? "hover:bg-muted" : ""} rounded-md p-2`}>
               <div className="text-sm font-medium text-muted-foreground">{label}</div>
               <span className="text-sm text-left break-all lg:ms-8">{value}</span>
          </div>

     )
}
