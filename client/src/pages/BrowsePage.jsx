// client/src/pages/BrowsePage.jsx (Updated to use StudySetGrid)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import studySetService from '../services/studySetService';
import StudySetGrid from '../components/study-sets/StudySetGrid';
import Pagination from '../components/study-sets/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/pages/browse.css';

const BrowsePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  // State management
  const [studySets, setStudySets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
    limit: 12
  });
  
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: '',
    category: '',
    creator: ''
  });

  const [filterStats, setFilterStats] = useState({
    categoryStats: [],
    totalStudySets: 0
  });

  // Fetch data
  useEffect(() => {
    fetchStudySets();
  }, [filters]);

  const fetchStudySets = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 Fetching browse study sets with filters:', filters);

      const response = await studySetService.getBrowseStudySets(filters);
      const { studySets: data, pagination: paginationData, filters: filterData } = response.data.data;

      console.log('✅ Browse study sets fetched:', {
        count: data.length,
        pagination: paginationData,
        filters: filterData
      });

      setStudySets(data);
      setPagination(paginationData);
      setFilterStats({
        categoryStats: filterData?.categoryStats || [],
        totalStudySets: paginationData.total
      });

    } catch (error) {
      console.error('❌ Fetch browse study sets error:', error);
      showError('Không thể tải danh sách học phần');
    } finally {
      setIsLoading(false);
    }
  };

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  // For browse mode, we don't need edit/delete, only duplicate
  const handleEdit = (studySet) => {
    // Not used in browse mode
    console.log('Edit not available in browse mode');
  };

  const handleDelete = (studySetId) => {
    // Not used in browse mode
    console.log('Delete not available in browse mode');
  };

  const handleDuplicate = async (studySetId) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const response = await studySetService.duplicateStudySet(studySetId);
      const newStudySet = response.data.data;
      
      showSuccess('Sao chép học phần thành công!');
      navigate(`/study-set/${newStudySet._id}`);

    } catch (error) {
      console.error('❌ Duplicate error:', error);
      showError('Không thể sao chép học phần');
      throw error;
    }
  };

  return (
    <div className="browse-page">
      <div className="browse-page__container">
        {/* Header Section */}
        <div className="browse-page__header">
          <div className="browse-page__title-section">
            <h1 className="browse-page__title">Khám phá bộ thẻ</h1>
            <p className="browse-page__subtitle">
              Tìm kiếm và học tập với hàng triệu bộ thẻ được tạo bởi cộng đồng
            </p>
          </div>
          
          <div className="browse-page__stats">
            <div className="browse-stat">
              <span className="browse-stat__number">{filterStats.totalStudySets.toLocaleString()}</span>
              <span className="browse-stat__label">Bộ thẻ</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="browse-filters">
          <div className="browse-filters__row">
            {/* Search */}
            <div className="browse-filters__search">
              <input
                type="text"
                placeholder="Tìm kiếm bộ thẻ..."
                value={filters.search}
                onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value, page: 1 })}
                className="browse-filters__search-input"
                disabled={isLoading}
              />
              <span className="browse-filters__search-icon">🔍</span>
            </div>

            {/* Sort */}
            <div className="browse-filters__sort">
              <label className="browse-filters__label">Sắp xếp:</label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-');
                  handleFiltersChange({ ...filters, sortBy, sortOrder, page: 1 });
                }}
                className="browse-filters__select"
                disabled={isLoading}
              >
                <option value="createdAt-desc">Mới nhất</option>
                <option value="createdAt-asc">Cũ nhất</option>
                <option value="title-asc">Tên A-Z</option>
                <option value="title-desc">Tên Z-A</option>
                <option value="cardCount-desc">Nhiều thẻ nhất</option>
                <option value="cardCount-asc">Ít thẻ nhất</option>
                <option value="studyCount-desc">Phổ biến nhất</option>
              </select>
            </div>
          </div>

          <div className="browse-filters__row">
            {/* Category Filter */}
            <div className="browse-filters__filter">
              <label className="browse-filters__label">Danh mục:</label>
              <select
                value={filters.category}
                onChange={(e) => handleFiltersChange({ ...filters, category: e.target.value, page: 1 })}
                className="browse-filters__select"
                disabled={isLoading}
              >
                <option value="">Tất cả danh mục</option>
                <option value="language">🌍 Ngôn ngữ</option>
                <option value="science">🔬 Khoa học</option>
                <option value="history">📜 Lịch sử</option>
                <option value="math">📐 Toán học</option>
                <option value="other">📚 Khác</option>
              </select>
            </div>

            {/* Clear Filters */}
            {(filters.search || filters.category) && (
              <button
                onClick={() => handleFiltersChange({
                  page: 1,
                  limit: filters.limit,
                  sortBy: 'createdAt',
                  sortOrder: 'desc',
                  search: '',
                  category: '',
                  creator: ''
                })}
                className="browse-filters__clear"
                disabled={isLoading}
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Quick Category Filters */}
        <div className="browse-categories">
          <h3>Danh mục phổ biến</h3>
          <div className="browse-categories__grid">
            {filterStats.categoryStats.map((category) => (
              <button
                key={category._id}
                onClick={() => handleFiltersChange({ ...filters, category: category._id, page: 1 })}
                className={`category-btn ${filters.category === category._id ? 'category-btn--active' : ''}`}
                disabled={isLoading}
              >
                <span className="category-btn__icon">
                  {category._id === 'language' && '🌍'}
                  {category._id === 'science' && '🔬'}
                  {category._id === 'history' && '📜'}
                  {category._id === 'math' && '📐'}
                  {category._id === 'other' && '📚'}
                </span>
                <span className="category-btn__name">
                  {category._id === 'language' && 'Ngôn ngữ'}
                  {category._id === 'science' && 'Khoa học'}
                  {category._id === 'history' && 'Lịch sử'}
                  {category._id === 'math' && 'Toán học'}
                  {category._id === 'other' && 'Khác'}
                </span>
                <span className="category-btn__count">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="browse-results">
          <div className="browse-results__info">
            {isLoading ? (
              <span>Đang tải...</span>
            ) : (
              <span>
                Tìm thấy <strong>{pagination.total}</strong> bộ thẻ
                {filters.search && (
                  <span> cho "<strong>{filters.search}</strong>"</span>
                )}
                {filters.category && (
                  <span> trong danh mục "<strong>{getCategoryName(filters.category)}</strong>"</span>
                )}
              </span>
            )}
          </div>
        </div>

        {/* Study Sets Grid - Using existing StudySetGrid component */}
        <StudySetGrid
          studySets={studySets}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          emptyMessage={
            filters.search || filters.category
              ? 'Không tìm thấy bộ thẻ nào phù hợp'
              : 'Chưa có bộ thẻ công khai nào'
          }
          showActions={!!user} // Only show actions if logged in
          isOwner={false} // These are not user's own study sets
          browseMode={true} // Special prop to indicate browse mode
        />

        {/* Pagination */}
        {pagination.pages > 1 && (
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

// Helper function
const getCategoryName = (category) => {
  const names = {
    language: 'Ngôn ngữ',
    science: 'Khoa học',
    history: 'Lịch sử',
    math: 'Toán học',
    other: 'Khác'
  };
  return names[category] || names.other;
};

export default BrowsePage;