// client/src/pages/MySetsPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import studySetService from '../services/studySetService';
import StudySetFilters from '../components/study-sets/StudySetFilters';
import StudySetGrid from '../components/study-sets/StudySetGrid';
import Pagination from '../components/study-sets/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import '../styles/pages/my-sets.css';

const MySetsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  // State management
  const [studySets, setStudySets] = useState([]);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
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
    privacy: ''
  });

  const [filterStats, setFilterStats] = useState({
    categoryStats: [],
    privacyStats: []
  });

  // Fetch data
  useEffect(() => {
    fetchStudySets();
  }, [filters]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStudySets = async () => {
    try {
      setIsLoading(true);
      console.log('📊 Fetching study sets with filters:', filters); // DEBUG

      const response = await studySetService.getUserStudySets(filters);
      const { studySets: data, pagination: paginationData, filters: filterData } = response.data.data;

      console.log('📥 Full response:', response.data);

      console.log('✅ Study sets fetched:', {
        count: data.length,
        pagination: paginationData,
        filters: filterData
      }); // DEBUG

      setStudySets(data);
      setPagination(paginationData);
      setFilterStats({
        categoryStats: filterData?.categoryStats || [],
        privacyStats: filterData?.privacyStats || []
      });

    } catch (error) {
      console.error('❌ Fetch study sets error:', error);
      showError('Không thể tải danh sách học phần');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await studySetService.getStudySetStats();
      setStats(response.data.data);
      console.log('📊 User stats:', response.data.data); // DEBUG
    } catch (error) {
      console.error('❌ Fetch stats error:', error);
      // Don't show error for stats, it's not critical
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
    console.log('📄 Page changed:', page); // DEBUG
    setFilters(prev => ({ ...prev, page }));
  };

  const handleEdit = (studySet) => {
    console.log('✏️ Edit study set:', studySet._id); // DEBUG
    navigate(`/study-set/${studySet._id}/edit`);
  };

  const handleDelete = async (studySetId) => {
    try {
      setIsDeleting(true);
      console.log('🗑️ Deleting study set:', studySetId); // DEBUG

      await studySetService.deleteStudySet(studySetId);
      
      showSuccess('Xóa học phần thành công!');
      
      // Refresh data
      await fetchStudySets();
      await fetchStats();

    } catch (error) {
      console.error('❌ Delete error:', error);
      showError('Không thể xóa học phần');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDuplicate = async (studySetId) => {
    try {
      console.log('📋 Duplicating study set:', studySetId); // DEBUG

      const response = await studySetService.duplicateStudySet(studySetId);
      const newStudySet = response.data.data;
      
      showSuccess('Sao chép học phần thành công!');
      
      // Refresh data to show new study set
      await fetchStudySets();
      await fetchStats();
      
      // Navigate to the new study set
      navigate(`/study-set/${newStudySet._id}`);

    } catch (error) {
      console.error('❌ Duplicate error:', error);
      showError('Không thể sao chép học phần');
      throw error; // Re-throw for StudySetCard to handle loading state
    }
  };

  const handleCreateNew = () => {
    navigate('/create-set');
  };

  return (
    <div className="my-sets-page">
      <div className="my-sets-page__container">
        {/* Header Section */}
        <div className="my-sets-page__header">
          <div className="my-sets-page__title-section">
            <h1 className="my-sets-page__title">Học phần của tôi</h1>
            <p className="my-sets-page__subtitle">
              Quản lý và theo dõi tất cả học phần bạn đã tạo
            </p>
          </div>
          
          <button 
            onClick={handleCreateNew}
            className="btn btn--primary btn--large my-sets-page__create-btn"
          >
            + Tạo học phần mới
          </button>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="my-sets-page__stats">
            <div className="stat-card">
              <div className="stat-card__icon">📚</div>
              <div className="stat-card__content">
                <div className="stat-card__number">{stats.overview.totalSets}</div>
                <div className="stat-card__label">Tổng học phần</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-card__icon">🃏</div>
              <div className="stat-card__content">
                <div className="stat-card__number">{stats.overview.totalCards}</div>
                <div className="stat-card__label">Tổng thẻ học</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-card__icon">🌐</div>
              <div className="stat-card__content">
                <div className="stat-card__number">{stats.overview.publicSets}</div>
                <div className="stat-card__label">Công khai</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-card__icon">🔒</div>
              <div className="stat-card__content">
                <div className="stat-card__number">{stats.overview.privateSets}</div>
                <div className="stat-card__label">Riêng tư</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-card__icon">📈</div>
              <div className="stat-card__content">
                <div className="stat-card__number">{stats.recentActivity.newSetsThisWeek}</div>
                <div className="stat-card__label">Tuần này</div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <StudySetFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          categoryStats={filterStats.categoryStats}
          privacyStats={filterStats.privacyStats}
          isLoading={isLoading}
        />

        {/* Results Summary */}
        <div className="my-sets-page__results">
          <div className="my-sets-page__results-info">
            {isLoading ? (
              <span>Đang tải...</span>
            ) : (
              <span>
                Tìm thấy <strong>{pagination.total}</strong> học phần
                {filters.search && (
                  <span> cho "<strong>{filters.search}</strong>"</span>
                )}
              </span>
            )}
          </div>
          
          {/* Quick Actions */}
          <div className="my-sets-page__quick-actions">
            <button
              onClick={() => handleFiltersChange({ ...filters, privacy: 'public' })}
              className="quick-action-btn"
              disabled={isLoading}
            >
              🌐 Công khai ({filterStats.privacyStats.find(s => s._id === 'public')?.count || 0})
            </button>
            <button
              onClick={() => handleFiltersChange({ ...filters, privacy: 'private' })}
              className="quick-action-btn"
              disabled={isLoading}
            >
              🔒 Riêng tư ({filterStats.privacyStats.find(s => s._id === 'private')?.count || 0})
            </button>
          </div>
        </div>

        {/* Study Sets Grid */}
        <StudySetGrid
          studySets={studySets}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          emptyMessage={
            filters.search || filters.category || filters.privacy
              ? 'Không tìm thấy học phần nào phù hợp'
              : 'Bạn chưa có học phần nào'
          }
        />

        {/* Pagination */}
        {pagination.pages > 1 && (
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        )}

        {/* Loading Overlay */}
        {isDeleting && (
          <div className="my-sets-page__loading-overlay">
            <div className="my-sets-page__loading-content">
              <LoadingSpinner size="large" />
              <p>Đang xóa học phần...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MySetsPage;