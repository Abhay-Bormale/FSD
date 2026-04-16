function FeedbackList({ feedbacks, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString('en-US', options)
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'active' : ''}`}>
        ★
      </span>
    ))
  }

  if (feedbacks.length === 0) {
    return (
      <div className="feedback-list">
        <h2>📋 Recent Feedbacks</h2>
        <div className="no-feedback">
          <p>No feedbacks yet. Be the first to share your experience!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="feedback-list">
      <h2>📋 Recent Feedbacks ({feedbacks.length})</h2>
      <div className="feedback-cards">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="feedback-card">
            <div className="card-header">
              <div className="student-info">
                <h3>{feedback.studentName}</h3>
                <span className="student-id">ID: {feedback.studentId}</span>
              </div>
              <div className="rating">
                {renderStars(feedback.rating)}
              </div>
            </div>

            <div className="card-body">
              <div className="course-info">
                <span className="badge badge-course">📚 {feedback.course}</span>
                <span className="badge badge-instructor">👨‍🏫 {feedback.instructor}</span>
              </div>
              <p className="feedback-text">{feedback.feedback}</p>
            </div>

            <div className="card-footer">
              <span className="date">🕐 {formatDate(feedback.createdAt)}</span>
              <div className="card-actions">
                <button 
                  className="btn-icon btn-edit" 
                  onClick={() => onEdit(feedback)}
                  title="Edit"
                >
                  ✏️
                </button>
                <button 
                  className="btn-icon btn-delete" 
                  onClick={() => onDelete(feedback._id)}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedbackList
