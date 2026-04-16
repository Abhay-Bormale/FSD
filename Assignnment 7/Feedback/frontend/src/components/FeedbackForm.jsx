import { useState, useEffect } from 'react'

function FeedbackForm({ onSubmit, editingFeedback, onCancelEdit }) {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    course: '',
    instructor: '',
    rating: 0,
    feedback: ''
  })

  useEffect(() => {
    if (editingFeedback) {
      setFormData({
        studentName: editingFeedback.studentName,
        studentId: editingFeedback.studentId,
        course: editingFeedback.course,
        instructor: editingFeedback.instructor,
        rating: editingFeedback.rating,
        feedback: editingFeedback.feedback
      })
    }
  }, [editingFeedback])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingFeedback) {
      onSubmit(editingFeedback._id, formData)
    } else {
      onSubmit(formData)
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      studentName: '',
      studentId: '',
      course: '',
      instructor: '',
      rating: 0,
      feedback: ''
    })
  }

  const handleCancel = () => {
    resetForm()
    onCancelEdit()
  }

  return (
    <div className="feedback-form">
      <h2>{editingFeedback ? '✏️ Edit Feedback' : '📝 Submit Your Feedback'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              placeholder="Enter your student ID"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">Select a course</option>
              <option value="Web Development">Web Development</option>
              <option value="Data Structures">Data Structures</option>
              <option value="Database Systems">Database Systems</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Computer Networks">Computer Networks</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="instructor">Instructor</label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleChange}
              placeholder="Enter instructor name"
              required
            />
          </div>

          <div className="form-group">
            <label>Rating</label>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${formData.rating >= star ? 'active' : ''}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="feedback">Your Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Share your experience, suggestions, or concerns..."
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingFeedback ? 'Update Feedback' : 'Submit Feedback'}
          </button>
          {editingFeedback && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
