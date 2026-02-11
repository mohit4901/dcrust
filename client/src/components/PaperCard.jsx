function PaperCard({ paper }) {
  const handleClick = () => {
    window.open(paper.pdf_url, '_blank');
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 shadow-sm hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1 border border-gray-100"
    >
      <div className="mb-2 sm:mb-3">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2 leading-snug line-clamp-2">
          {paper.subject_name}
        </h3>
        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-semibold">
          {paper.subject_code}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
        <div className="bg-gray-100 text-gray-700 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-medium">
          {paper.branch}
        </div>
        <div className="bg-gray-100 text-gray-700 px-2 py-0.5 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm font-medium">
          {paper.session} {paper.year}
        </div>
      </div>

      <div className="pt-2 sm:pt-3 border-t border-gray-200">
        <span className="text-primary-600 font-medium text-xs sm:text-sm hover:underline">
          View PDF →
        </span>
      </div>
    </div>
  );
}

export default PaperCard;