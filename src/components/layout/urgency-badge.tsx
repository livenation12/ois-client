import type { Urgency } from '@/types/routing-slip.types'
import { Badge } from '../ui/badge'

interface UrgencyBadgeProps {
     urgency: Urgency
}

export default function UrgencyBadge(props: UrgencyBadgeProps) {
     const urgency = props.urgency.toLowerCase();
     let badgeVariant = 'default';
     switch (urgency) {
          case 'high':
               badgeVariant = 'destructive';
               break;
          case 'medium':
               badgeVariant = 'secondary';
               break;
          case 'low':
               badgeVariant = 'default';
               break;
     }
     return (
          <Badge variant={props.urgency.toLowerCase() === 'high' ? 'destructive' : 'default'}>{props.urgency}</Badge>
     )
}
