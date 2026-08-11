import { forwardRef } from "react";

const BookPage = forwardRef(({ children, className = "" }, ref) => {
  return (
    <div ref={ref} className={`book-page ${className}`}>
      <div className="page-content">
        {children}
      </div>
    </div>
  );
});

BookPage.displayName = "BookPage";

export default BookPage;