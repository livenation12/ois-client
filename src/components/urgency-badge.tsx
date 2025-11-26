import type { VariantProps } from 'class-variance-authority';
import { Badge, badgeVariants } from './ui/badge'
import type { Urgency } from '@/types/routing-slip.types'

interface UrgencyBadgeProps {
     urgency: Urgency
}

export default function UrgencyBadge(props: UrgencyBadgeProps) {
     let badgeVariant : VariantProps<typeof badgeVariants>;
     switch (props.urgency) {
          case 'high':
               badgeVariant = 'destructive'
               break
          case 'medium':
               badgeVariant = 'warning'
               break
          case 'low':
               badgeVariant = 'default'
               break
               
     }
  return (
    <Badge variant={badgeVariant}>{props.urgency}</Badge>
  )
}
