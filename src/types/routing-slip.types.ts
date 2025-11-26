export type Urgency = 'high' | 'medium' | 'low'

export interface RoutingSlip {
     id: string
     docTin: string
     title: string
     subject: string
     urgency: Urgency
     actionRequested: string
     documentId: string
}

export interface RoutingSlipRequest extends Omit<RoutingSlip, 'id' | 'docTin'> { 
     attachment: File | null
}