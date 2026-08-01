const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const variants = {
    // ✅ PRIMARY — Bold Gradient (Login, Register, Get Started)
    primary: 'bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white font-bold shadow-lg hover:shadow-xl shadow-primary/30 transform hover:scale-105 transition-all duration-300',
    // ✅ OUTLINE — For secondary actions
    outline: 'border-2 border-primary text-primary hover:bg-primary/10 font-semibold transition-all duration-300',
    // ✅ GHOST — For cancel/light actions
    ghost: 'text-primary hover:bg-primary/10 font-medium transition-all duration-300',
    // ✅ SUCCESS — For Add buttons
    success: 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white font-bold shadow-lg hover:shadow-xl shadow-green-500/30 transform hover:scale-105 transition-all duration-300',
    // ✅ DANGER — For Remove buttons
    danger: 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-rose-500 hover:to-red-500 text-white font-bold shadow-lg hover:shadow-xl shadow-red-500/30 transform hover:scale-105 transition-all duration-300',
    // ✅ GLASS — For premium feel
    glass: 'glass-card hover:bg-white/10 font-semibold transition-all duration-300',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
    xl: 'px-10 py-5 text-xl rounded-2xl',
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button