import * as React from "react"

const Label = React.forwardRef(
  ({ className = "", ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`text-xs font-bold uppercase tracking-wider ${className}`}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
