import * as React from "react"

const Input = React.forwardRef(
  ({ className = "", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`border-[3px] border-black px-4 py-2 font-mono bg-white focus:outline-none focus:ring-2 focus:ring-gami-purple ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
