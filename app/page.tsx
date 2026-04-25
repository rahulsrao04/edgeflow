"use client"

import { FormEvent, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Play, Target, TrendingUp, BookOpen, Eye, Brain, Shield, Crosshair, BarChart3, Zap, Lock } from "lucide-react"

const supabase = createClient(
  "https://hjwssebgpbmeumhltazz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhqd3NzZWJncGJtZXVtaGx0YXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNTMzMTksImV4cCI6MjA5MjYyOTMxOX0.aZGBV5Sz66WWap3zd6GEefavQIqnycc-HOVFDwOy2LU",
)

function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage("")
    setIsSubmitting(true)

    try {
      const normalizedEmail = email.trim().toLowerCase()
      console.log("[Waitlist] Submitting email:", normalizedEmail)

      const response = await supabase.from("waitlist").insert({ email: normalizedEmail })
      console.log("[Waitlist] Supabase insert response:", response)
      const { error } = response

      if (error) {
        console.error("[Waitlist] Supabase insert error:", error)
        throw error
      }

      console.log("[Waitlist] Submission succeeded")
      setIsSuccess(true)
      setEmail("")
    } catch (error) {
      console.error("[Waitlist] Submission failed:", error)
      setErrorMessage("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="mx-auto flex h-12 w-full max-w-md items-center justify-center rounded-md border border-primary/30 bg-card/40 px-4 text-center text-sm font-medium text-green-400 sm:text-base">
        {"You're"} in. {"We'll"} be in touch.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter your email"
        autoComplete="email"
        required
        className="h-12 border-border/60 bg-card/40"
      />
      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 gap-2 bg-primary px-8 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-80"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
        <ArrowRight className="h-4 w-4" />
      </Button>
      {errorMessage ? (
        <p className="text-sm text-red-400 sm:basis-full sm:pt-1">{errorMessage}</p>
      ) : null}
    </form>
  )
}

export default function Home() {
  const levels = [
    { name: "Tutorial", subtitle: "Initiation", icon: BookOpen, description: "Learn the basics of market mechanics", free: true },
    { name: "Level 1", subtitle: "Foundations", icon: Target, description: "Build your trading vocabulary", free: true },
    { name: "Level 2", subtitle: "Pattern Recognition", icon: Eye, description: "Spot opportunities others miss", free: true },
    { name: "Level 3", subtitle: "Discipline", icon: Brain, description: "Control your emotional responses", free: false },
    { name: "Level 4", subtitle: "Decision", icon: Crosshair, description: "Make calculated moves under pressure", free: false },
    { name: "Level 5", subtitle: "Risk", icon: Shield, description: "Protect your capital like a pro", free: false },
    { name: "Level 6", subtitle: "Strategy", icon: BarChart3, description: "Develop your personal edge", free: false },
    { name: "Level 7", subtitle: "Market Reality", icon: Zap, description: "Trade with real market conditions", free: false },
  ]

  const audiences = [
    { title: "Beginners", description: "Never traded before? Perfect. We built this for you." },
    { title: "Students", description: "Learn what your finance class won't teach you." },
    { title: "Young Investors", description: "Stop gambling. Start understanding." },
  ]

  return (
    <main className="relative overflow-hidden">
      {/* Grid overlay */}
      <div className="grid-overlay pointer-events-none fixed inset-0" />
      
      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Green glow effects */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
          <div className="mx-auto w-full max-w-2xl text-center">
            {/* Logo */}
            <div className="mb-16">
              <h1 className="font-sans text-2xl font-medium tracking-tight text-foreground">
                Edge<span className="text-primary">Flow</span>
              </h1>
            </div>
            
            {/* Tagline */}
            <h2 className="mb-6 font-sans text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              <span className="text-balance">
                {"You're"} not learning trading.{" "}
                <span className="text-primary">{"You're"} rewiring your behavior.</span>
              </span>
            </h2>
            
            {/* Subheadline */}
            <p className="mx-auto mb-12 max-w-lg text-lg text-muted-foreground sm:text-xl">
              Learn trading through real simulations, not boring lectures. Free to start.
            </p>
            
            {/* CTA Form */}
            <WaitlistForm />
            
            {/* Reassurance text */}
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card. No commitment. Just start.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
      </div>

      {/* Section 1 — How It Works */}
      <section className="relative py-40">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h3 className="mb-16 text-center font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            How Edge<span className="text-primary">Flow</span> Works
          </h3>
          
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Watch", icon: Play, description: "Short reel-style concept explanation. No hour-long lectures." },
              { step: "02", title: "Simulate", icon: Target, description: "Apply it instantly with fake money. Zero risk, real learning." },
              { step: "03", title: "Improve", icon: TrendingUp, description: "Get feedback on exactly what you did wrong. Then do it again." },
            ].map((item) => (
              <div 
                key={item.step}
                className="group relative rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/50"
              >
                <div className="mb-4 flex items-center gap-4">
                  <span className="font-mono text-sm text-primary">{item.step}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <h4 className="mb-3 text-xl font-semibold text-foreground">{item.title}</h4>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
      </div>

      {/* Section — Learning, Reimagined */}
      <section className="relative py-40">
        <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h3 className="mb-20 text-center font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Learning, <span className="text-primary">Reimagined</span>
          </h3>
          
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left side - Phone mockup */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Phone glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-primary/20 blur-[40px]" />
                
                {/* Phone frame */}
                <div className="relative w-[280px] rounded-[2.5rem] border-[8px] border-[#1a1a1a] bg-[#0a0a0a] p-2 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-[#1a1a1a]" />
                  
                  {/* Screen */}
                  <div className="relative overflow-hidden rounded-[2rem] bg-[#0d0d0d]">
                    {/* Video card content */}
                    <div className="flex aspect-[9/16] flex-col justify-between p-6">
                      {/* Candlestick chart graphic */}
                      <div className="mt-8 flex items-end justify-center gap-1">
                        {[
                          { up: true, height: 40 },
                          { up: false, height: 55 },
                          { up: true, height: 35 },
                          { up: false, height: 70 },
                          { up: false, height: 50 },
                          { up: true, height: 45 },
                          { up: false, height: 60 },
                        ].map((candle, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div 
                              className={`w-0.5 ${candle.up ? "bg-primary" : "bg-red-500"}`}
                              style={{ height: `${candle.height * 0.3}px` }}
                            />
                            <div 
                              className={`w-3 rounded-sm ${candle.up ? "bg-primary" : "bg-red-500"}`}
                              style={{ height: `${candle.height}px` }}
                            />
                            <div 
                              className={`w-0.5 ${candle.up ? "bg-primary" : "bg-red-500"}`}
                              style={{ height: `${candle.height * 0.2}px` }}
                            />
                          </div>
                        ))}
                      </div>
                      
                      {/* Bold text */}
                      <div className="text-center">
                        <p className="text-2xl font-bold leading-tight text-foreground">
                          You bought too late.
                        </p>
                        <p className="mt-2 text-xl font-semibold text-primary">
                          Skill issue.
                        </p>
                      </div>
                      
                      {/* Story-style progress bar */}
                      <div className="mb-4">
                        <div className="flex gap-1">
                          <div className="h-0.5 flex-1 rounded-full bg-primary" />
                          <div className="h-0.5 flex-1 rounded-full bg-primary" />
                          <div className="h-0.5 flex-1 rounded-full bg-primary/40" />
                          <div className="h-0.5 flex-1 rounded-full bg-muted" />
                          <div className="h-0.5 flex-1 rounded-full bg-muted" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Copy */}
            <div>
              <h4 className="mb-4 text-2xl font-semibold text-foreground sm:text-3xl">
                No lectures. Just experience.
              </h4>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                EdgeFlow breaks down everything a trading course teaches you — then makes you live it. 
                Watch the concept. Enter the simulation. Fail. Understand why. Try again. {"That's"} how real learning happens.
              </p>
              
              <div className="space-y-4">
                {[
                  "Every concept taught through experience, not theory",
                  "Fail safely with fake money, learn for real",
                  "Explanations that hit when you actually need them",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
      </div>

      {/* Section — Key Features */}
      <section className="relative py-40">
        <div className="pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h3 className="mb-6 text-center font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Trading education never evolved. <span className="text-primary">Until now.</span>
          </h3>
          <p className="mx-auto mb-16 max-w-2xl text-center text-muted-foreground">
            A complete system designed to build real trading instincts.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Play,
                title: "Reel-Style Concepts",
                description: "Short, sharp concept drops that actually stick. Not a lecture. An experience.",
              },
              {
                icon: Target,
                title: "Real Simulations",
                description: "Apply every concept instantly with fake money. Real market data. Real decisions. Zero risk.",
              },
              {
                icon: TrendingUp,
                title: "Fail Forward",
                description: "You'll fail. That's the point. Every mistake is a lesson. Hit the explanation button and find out exactly why.",
              },
              {
                icon: BarChart3,
                title: "Behavior Analytics",
                description: "See your patterns. Win rate, entry timing, overtrading habits. Know yourself as a trader.",
              },
              {
                icon: Brain,
                title: "Guided Progression",
                description: "You don't choose what to learn next. We do. Because discipline before freedom is how real traders think.",
              },
              {
                icon: Zap,
                title: "Unlock Full Control",
                description: "Master the basics, earn the freedom. Advanced levels let you choose your stocks, test your strategies, trade your way.",
              },
            ].map((feature) => (
              <div 
                key={feature.title}
                className="group rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/50 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-3 text-lg font-semibold text-foreground">{feature.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
      </div>

      {/* Section 2 — The Journey */}
      <section className="relative py-40">
        <div className="pointer-events-none absolute left-0 top-1/3 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6">
          <h3 className="mb-6 text-center font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Your Trading Transformation
          </h3>
          <p className="mx-auto mb-16 max-w-lg text-center text-muted-foreground">
            Progress from complete beginner to market-ready trader.
          </p>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-border md:left-1/2 md:block" />
            
            <div className="space-y-4">
              {levels.map((level, index) => (
                <div 
                  key={level.name}
                  className={`relative flex items-center gap-6 rounded-xl border p-5 transition-all ${
                    level.free 
                      ? "border-primary/30 bg-primary/5 hover:bg-primary/10" 
                      : "border-border/50 bg-card/20 hover:border-border"
                  }`}
                >
                  {/* Connector dot */}
                  <div className="absolute left-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-background bg-primary md:left-1/2 md:block" />
                  
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                    level.free ? "bg-primary/20" : "bg-muted"
                  }`}>
                    <level.icon className={`h-5 w-5 ${level.free ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className={`font-mono text-xs ${level.free ? "text-primary" : "text-muted-foreground"}`}>
                        {level.name}
                      </span>
                      <span className="text-sm font-medium text-foreground">{level.subtitle}</span>
                      {level.free ? (
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                          Free
                        </span>
                      ) : (
                        <Lock className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
      </div>

      {/* Section 3 — Who It's For */}
      <section className="relative py-40">
        <div className="pointer-events-none absolute right-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
        
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <h3 className="mb-6 text-center font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Built For You
          </h3>
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
            For the generation that lost money before understanding why.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3">
            {audiences.map((audience) => (
              <div 
                key={audience.title}
                className="rounded-xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card/50 hover:shadow-[0_0_25px_rgba(34,197,94,0.15)]"
              >
                <h4 className="mb-3 text-xl font-semibold text-foreground">{audience.title}</h4>
                <p className="text-muted-foreground">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="relative mx-auto max-w-4xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
      </div>

      {/* Section 4 — Final CTA */}
      <section className="relative py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[150px]" />
        
        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <h3 className="mb-6 font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <span className="text-balance">
              Ready to think like a <span className="text-primary">trader</span>?
            </span>
          </h3>
          <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground">
            Join the waitlist and be first to access EdgeFlow.
          </p>
          
          <WaitlistForm />
          
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card. No commitment. Just start.
          </p>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </main>
  )
}
