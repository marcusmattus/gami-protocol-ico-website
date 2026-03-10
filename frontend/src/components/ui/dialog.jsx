import * as React from "react"

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 border-[3px] border-black bg-white p-6 max-w-lg w-full mx-4">
        {children}
      </div>
    </div>
  )
}

const DialogTrigger = ({ asChild, children, ...props }) => {
  return React.cloneElement(children, props)
}

const DialogContent = ({ children, className }) => {
  return <div className={className}>{children}</div>
}

const DialogHeader = ({ children, className }) => {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

const DialogTitle = ({ children, className }) => {
  return <h2 className={`text-2xl font-black uppercase ${className}`}>{children}</h2>
}

const DialogDescription = ({ children, className }) => {
  return <p className={`text-sm ${className}`}>{children}</p>
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
}
