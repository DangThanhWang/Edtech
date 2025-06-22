// client/src/components/study-sets/StudySetFilters.jsx
import React from 'react';

const StudySetFilters = ({ 
  filters, 
  onFiltersChange, 
  categoryStats = [], 
  privacyStats = [],
  isLoading = false 
}) => {
  const sortOptions = [
    { value: 'createdAt-desc', label: 'Mới nhất' },
    { value: 'createdAt-asc', label: 'Cũ nhất' },
    { value: 'title-asc', label: 'Tên A-Z' },
    { value: 'title-desc', label: 'Tên Z-A' },
    { value: 'cardCount-desc', label: 'Nhiều thẻ nhất' },
    { value: 'cardCount-asc', label: 'Ít thẻ nhất' },
    { value: 'updatedAt-desc', label: 'Sửa gần đây' }
  ];

  const categoryOptions = [
    { value: '', label: 'Tất cả danh mục' },
    { value: 'language', label: '🌍 Ngôn ngữ' },
    { value: 'science', label: '🔬 Khoa học' },
    { value: 'history', label: '📜 Lịch sử' },
    { value: 'math', label: '📐 Toán học' },
    { value: 'other', label: '📚 Khác' }
  ];

  const privacyOptions = [
    { value: '', label: 'Tất cả' },
    { value: 'public', label: '🌐 Công khai' },
    { value: 'private', label: '🔒 Riêng tư' }
  ];

  const handleSortChange = (value) => {
    const [sortBy, sortOrder] = value.split('-');
    onFiltersChange({ ...filters, sortBy, sortOrder, page: 1 });
  };

  const handleSearchChange = (e) => {
    const search = e.target.value;
    onFiltersChange({ ...filters, search, page: 1 });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    onFiltersChange({ ...filters, category, page: 1 });
  };

  const handlePrivacyChange = (e) => {
    const privacy = e.target.value;
    onFiltersChange({ ...filters, privacy, page: 1 });
  };

  const clearFilters = () => {
    onFiltersChange({
      page: 1,
      limit: filters.limit,
      sortBy: 'createdAt',
      sortOrder: 'desc',
      search: '',
      category: '',
      privacy: ''
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.privacy;

  return (
    <div className="study-set-filters">
      <div className="study-set-filters__row">
        {/* Search */}
        <div className="study-set-filters__search">
          <input
            type="text"
            placeholder="Tìm kiếm học phần..."
            value={filters.search}
            onChange={handleSearchChange}
            className="study-set-filters__search-input"
            disabled={isLoading}
          />
          <span className="study-set-filters__search-icon">🔍</span>
        </div>

        {/* Sort */}
        <div className="study-set-filters__sort">
          <label className="study-set-filters__label">Sắp xếp:</label>
          <select
            value={`${filters.sortBy}-${filters.sortOrder}`}
            onChange={(e) => handleSortChange(e.target.value)}
            className="study-set-filters__select"
            disabled={isLoading}
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="study-set-filters__row">
        {/* Category Filter */}
        <div className="study-set-filters__filter">
          <label className="study-set-filters__label">Danh mục:</label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="study-set-filters__select"
            disabled={isLoading}
          >
            {categoryOptions.map(option => {
              const stat = categoryStats.find(s => s._id === option.value);
              const count = stat ? ` (${stat.count})` : '';
              return (
                <option key={option.value} value={option.value}>
                  {option.label}{count}
                </option>
              );
            })}
          </select>
        </div>

        {/* Privacy Filter */}
        <div className="study-set-filters__filter">
          <label className="study-set-filters__label">Quyền riêng tư:</label>
          <select
            value={filters.privacy}
            onChange={handlePrivacyChange}
            className="study-set-filters__select"
            disabled={isLoading}
          >
            {privacyOptions.map(option => {
              const stat = privacyStats.find(s => s._id === option.value);
              const count = stat ? ` (${stat.count})` : '';
              return (
                <option key={option.value} value={option.value}>
                  {option.label}{count}
                </option>
              );
            })}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="study-set-filters__clear"
            disabled={isLoading}
          >
            Xóa bộ lọc
          </button>
        )}
      </div>
    </div>
  );
};

export default StudySetFilters;