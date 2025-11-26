import React from 'react'

export default function DetailItem({ label, value }: { label: string; value: React.ReactNode }) {
     return (

          <div className="flex justify-between items-start">
               <span className="text-sm font-medium text-muted-foreground">{label}</span>
               <span className="text-sm text-left break-all ms-8">{value}</span>
          </div>

     )
}
