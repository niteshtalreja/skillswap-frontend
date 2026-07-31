import { useEffect, useState } from 'react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { getMyOffers, getMyWants } from '../services/skillService'
import { getMyMatches } from '../services/matchService'
import { getMySentRequests, getMyReceivedRequests } from '../services/exchangeRequestService'

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const [stats, setStats] = useState({
    offers: 0,
    wants: 0,
    matches: 0,
    sentRequests: 0,
    receivedRequests: 0
  })
  const [loading, setLoading] = useState(true)

  // ✅ FUNCTION PEHLE DEFINE KAREIN
  const loadDashboardData = async () => {
    try {
      const [offers, wants, matches, sent, received] = await Promise.all([
        getMyOffers(),
        getMyWants(),
        getMyMatches(),
        getMySentRequests(),
        getMyReceivedRequests()
      ])
      setStats({
        offers: offers.data.length,
        wants: wants.data.length,
        matches: matches.data.length,
        sentRequests: sent.data.length,
        receivedRequests: received.data.length
      })
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ PHIR USE EFFECT
  useEffect(() => {
    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 mt-4">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">
            Welcome back, {user.name || 'User'}! 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Here's your skill exchange summary
          </p>
        </div>
        <Button onClick={() => window.location.href = '/profile'}>
          Manage Skills
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="dark" className="text-center">
          <div className="text-3xl mb-2">📚</div>
          <p className="text-2xl font-bold text-white">{stats.offers}</p>
          <p className="text-sm text-gray-400">Skills I Teach</p>
        </Card>

        <Card variant="dark" className="text-center">
          <div className="text-3xl mb-2">🎯</div>
          <p className="text-2xl font-bold text-white">{stats.wants}</p>
          <p className="text-sm text-gray-400">Skills I Want</p>
        </Card>

        <Card variant="dark" className="text-center">
          <div className="text-3xl mb-2">🤝</div>
          <p className="text-2xl font-bold text-white">{stats.matches}</p>
          <p className="text-sm text-gray-400">Matches Found</p>
        </Card>

        <Card variant="dark" className="text-center">
          <div className="text-3xl mb-2">📩</div>
          <p className="text-2xl font-bold text-white">{stats.sentRequests + stats.receivedRequests}</p>
          <p className="text-sm text-gray-400">Total Requests</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="gradient" className="text-center">
          <h3 className="text-lg font-heading font-bold text-white">Find Your Match</h3>
          <p className="text-gray-400 text-sm mt-1">Discover people with matching skills</p>
          <Button size="sm" className="mt-4" onClick={() => window.location.href = '/matches'}>
            View Matches →
          </Button>
        </Card>

        <Card variant="gradient" className="text-center">
          <h3 className="text-lg font-heading font-bold text-white">Manage Requests</h3>
          <p className="text-gray-400 text-sm mt-1">Track your sent and received requests</p>
          <Button size="sm" className="mt-4" onClick={() => window.location.href = '/requests'}>
            View Requests →
          </Button>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard