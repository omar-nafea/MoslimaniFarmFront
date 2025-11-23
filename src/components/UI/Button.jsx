import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center px-lg py-sm rounded-full font-semibold transition-all duration-200 cursor-pointer border-none outline-none';

  const variantClasses = {
    primary: 'bg-gradient-to-br from-brand-green to-brand-green-light text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg',
    secondary: 'bg-white text-brand-green border-2 border-brand-green hover:bg-brand-green/5',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white/10',
    ghost: 'bg-transparent text-gray-900 shadow-none hover:bg-black/5',
    gradient: 'bg-gradient-to-r from-brand-green to-brand-green-light text-white shadow-md hover:-translate-y-0.5 hover:shadow-lg'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'gradient']),
  className: PropTypes.string,
};

export default Button;
