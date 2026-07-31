const Badge = ({ variant = 'primary', children, className = '', ...props }) => {
  const variants = {
    primary: 'bg-primary/20 text-primary',
    secondary: 'bg-secondary/20 text-secondary',
    accent: 'bg-accent/20 text-accent',
    success: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    danger: 'bg-red-500/20 text-red-400',
  }

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${variants[variant] || variants.primary}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge