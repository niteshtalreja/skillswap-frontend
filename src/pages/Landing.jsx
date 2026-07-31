import Button from '../components/ui/Button'

const Landing = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-secondary/20 animate-gradient" />
        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float delay-2000" />

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
          <p className="text-xl text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
            Join thousands of skill swappers around the world. 
            Exchange skills for <span className="text-gradient font-semibold">FREE</span>. Grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button size="lg" onClick={() => window.location.href = '/register'}>
              Get Started 🚀
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo ▶️
            </Button>
          </div>

          {/* CTA Card — Be the first 100 users */}
          <div className="mt-12">
            <div className="glass-card p-8 max-w-2xl mx-auto border border-primary/20">
              <p className="text-2xl text-white font-heading font-semibold">
                🚀 Be the first 100 users
              </p>
              <p className="text-gray-400 mt-2 text-lg">
                Start your skill journey today. Join the community!
              </p>
              <Button 
                size="lg" 
                className="mt-4"
                onClick={() => window.location.href = '/register'}
              >
                Join Now — It's Free!
              </Button>
            </div>
          </div>

          {/* Trust Indicators (Social Proof) */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <span>✅ 100% Free</span>
            <span>🌍 Global Community</span>
            <span>🔄 Skill Exchange</span>
            <span>⭐ No Hidden Charges</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-dark to-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-gradient">
            Why SkillSwap?
          </h2>
          <p className="text-center text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Learn what you love. Teach what you know. Build your skills for free.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* Feature 1 */}
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">🔄</div>
              <h3 className="text-xl font-heading font-bold text-white">Skill Exchange</h3>
              <p className="text-gray-400 mt-2">
                Teach what you know. Learn what you love. No money needed.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-heading font-bold text-white">Global Community</h3>
              <p className="text-gray-400 mt-2">
                Connect with learners and teachers from around the world.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-heading font-bold text-white">100% Free</h3>
              <p className="text-gray-400 mt-2">
                No hidden charges. No subscription. Just pure learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-gradient">
            How It Works
          </h2>
          <p className="text-center text-gray-400 mt-4 text-lg">
            Three simple steps to start your skill journey.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-3xl font-heading font-bold text-primary">
                1
              </div>
              <h4 className="text-xl font-heading font-bold text-white mt-4">Sign Up</h4>
              <p className="text-gray-400 mt-2">Create your free account in 30 seconds.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto text-3xl font-heading font-bold text-secondary">
                2
              </div>
              <h4 className="text-xl font-heading font-bold text-white mt-4">Add Skills</h4>
              <p className="text-gray-400 mt-2">Tell us what you can teach and want to learn.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-3xl font-heading font-bold text-accent">
                3
              </div>
              <h4 className="text-xl font-heading font-bold text-white mt-4">Start Swapping</h4>
              <p className="text-gray-400 mt-2">Connect, exchange, and grow your skills.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-primary/10 to-dark">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 mt-4">
            Join the SkillSwap community today and start learning for free.
          </p>
          <Button 
            size="lg" 
            className="mt-8"
            onClick={() => window.location.href = '/register'}
          >
            Get Started for Free 🚀
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            🚀 Be the first 100 users
          </p>
        </div>
      </section>
    </div>
  )
}

export default Landing