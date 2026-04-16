import { useState, useEffect } from 'react'
import axios from 'axios'
import FeedbackForm from './components/FeedbackForm'
import FeedbackList from './components/FeedbackList'
import './App.css'

const API_URL = 'http://localhost:5000/api/feedback'

function App() {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingFeedback, setEditingFeedback] = useState(null)

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(API_URL)
      setFeedbacks(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
      setLoading(false)
    }
  }

  const addFeedback = async (feedbackData) => {
    try {
      const response = await axios.post(API_URL, feedbackData)
      setFeedbacks([response.data, ...feedbacks])
    } catch (error) {
      console.error('Error adding feedback:', error)
    }
  }

  const updateFeedback = async (id, feedbackData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, feedbackData)
      setFeedbacks(feedbacks.map(f => f._id === id ? response.data : f))
      setEditingFeedback(null)
    } catch (error) {
      console.error('Error updating feedback:', error)
    }
  }

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        await axios.delete(`${API_URL}/${id}`)
        setFeedbacks(feedbacks.filter(f => f._id !== id))
      } catch (error) {
        console.error('Error deleting feedback:', error)
      }
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Student Feedback System</h1>
        <p>Share your learning experience and help improve our courses</p>
      </header>

      <main className="main-content">
        <FeedbackForm 
          onSubmit={editingFeedback ? updateFeedback : addFeedback}
          editingFeedback={editingFeedback}
          onCancelEdit={() => setEditingFeedback(null)}
        />

        {loading ? (
          <div className="loading">Loading feedbacks...</div>
        ) : (
          <FeedbackList 
            feedbacks={feedbacks}
            onEdit={setEditingFeedback}
            onDelete={deleteFeedback}
          />
        )}
      </main>

      <footer className="footer">
        <p>© 2024 Student Feedback System - Built with React & MongoDB</p>
      </footer>
    </div>
  )
}

export default App
