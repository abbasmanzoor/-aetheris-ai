export const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop ${className}`}>
      {children}
    </div>
  );
};