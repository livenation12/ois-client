export interface Office {
     id: string
     name: string
     code: string
     department: string
}

export type OfficeForm = Omit<Office, "id">

export interface OfficeMin {
     id: string
     name: string
}