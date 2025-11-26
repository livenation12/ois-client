import { useState } from "react";

function SeeMoreText({ text, limit = 80 }: { text: string; limit?: number }) {
     const [expanded, setExpanded] = useState(false);
     const isLong = text.length > limit;

     const displayText = expanded ? text : text.slice(0, limit) + (isLong ? "..." : "");

     return (
          <p className="text-sm text-muted-foreground">
               {displayText}
               {isLong && (
                    <button
                    
                         onClick={() => setExpanded(!expanded)}
                         className="ml-1 text-accent-foreground hover:underline transition-colors"
                    >
                         {expanded ? "See less" : "See more"}
                    </button>
               )}
          </p>
     );
}

export default SeeMoreText;
