// src/components/ui/Card.jsx
const Card = ({ children, className = '' }) => {
  return (
    <div className={`p-4 rounded-xl shadow-md bg-white ${className}`}>
      {children}
    </div>
  );
};

export default Card;
