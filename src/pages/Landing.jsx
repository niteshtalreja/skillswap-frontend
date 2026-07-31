import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const Landing = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-secondary/20 animate-gradient" />
        
        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float delay-1000" />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-heading font-bold">
            <span className="text-white">Learn</span>
            <span className="text-gradient"> Anything.</span>
          </h1>
          <h2 className="text-4xl md:text-6xl font-heading font-bold mt-2">
            <span className="text-white">Teach</span>
            <span className="text-gradient"> Anything.</span>
          </h2>
          <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto">
            Join thousands of skill swappers around the world. 
            Exchange skills for FREE. Grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button size="lg" onClick={() => window.location.href = '/register'}>
              Get Started 🚀
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo ▶️
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div><p className="text-3xl font-bold text-white">10K+</p><p className="text-gray-400">Users</p></div>
            <div><p className="text-3xl font-bold text-white">50K+</p><p className="text-gray-400">Exchanges</p></div>
            <div><p className="text-3xl font-bold text-white">100+</p><p className="text-gray-400">Countries</p></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-heading font-bold text-center text-gradient">Why SkillSwap?</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
          <Card variant="gradient" className="text-center">
            <div className="text-5xl mb-4">🔄</div>
            <h3 className="text-xl font-heading font-bold text-white">Skill Exchange</h3>
            <p className="text-gray-400 mt-2">Teach what you know. Learn what you love.</p>
          </Card>
          <Card variant="gradient" className="text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-heading font-bold text-white">Global Community</h3>
            <p className="text-gray-400 mt-2">Connect with learners worldwide.</p>
          </Card>
          <Card variant="gradient" className="text-center">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-heading font-bold text-white">100% Free</h3>
            <p className="text-gray-400 mt-2">No hidden charges. Ever.</p>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Landing