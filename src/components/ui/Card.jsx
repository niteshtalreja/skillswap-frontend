const Card = ({ children, variant = 'glass', className = '', ...props }) => {
  const variants = {
    glass: 'glass-card',
    dark: 'bg-card border border-border rounded-2xl',
    gradient: 'bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl',
  }

  return (
    <div 
      className={`
        p-6 transition-all duration-300
        ${variants[variant] || variants.glass}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card