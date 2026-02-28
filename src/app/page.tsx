import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-balance leading-tight mb-6">
            The Ultimate{' '}
            <span className="text-primary">Werewolf Game</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
            Experience thrilling gameplay with strategy, deception, and teamwork. Host your own game or join exciting matches with players worldwide.
          </p>

          <Link href="/login">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-7 rounded-lg">
              Start Playing Now
            </Button>
          </Link>
        </div>
      </section>
      <section className="px-6 lg:px-12 py-16 text-center border-b border-border">
        <p className="text-muted-foreground mb-3">New to the game?</p>
        <Link href="/how-to" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors">
          Learn How to Play →
        </Link>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl lg:text-5xl font-bold text-balance mb-4">
              Choose Your Adventure
            </h3>
            <p className="text-lg text-muted-foreground">
              Play the way you want. Host a game with your rules or join an existing one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-2 border-border hover:border-primary transition-colors group cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="text-2xl font-bold mb-3">Host a Game</h4>
                <p className="text-muted-foreground mb-6 flex-1">
                  Create your own game room, invite friends, set custom rules, and lead the hunt as the game host.
                </p>
                <div className="flex items-center text-primary font-semibold">
                  Create & Lead →
                </div>
              </div>
            </Card>

            <Card className="p-8 border-2 border-border hover:border-primary transition-colors group cursor-pointer">
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="text-2xl font-bold mb-3">Join a Game</h4>
                <p className="text-muted-foreground mb-6 flex-1">
                  Browse available games, join with a game code, and jump into the action with players worldwide.
                </p>
                <div className="flex items-center text-primary font-semibold">
                  Find & Join →
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-balance">
            Why Players Love Werewolf
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Instant Gameplay',
                description: 'No downloads needed. Play directly in your browser.',
              },
              {
                title: 'Community Driven',
                description: 'Join a thriving community of strategic game players.',
              },
              {
                title: 'Fair Play',
                description: 'Advanced anti-cheat systems for honest gameplay.',
              },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col">
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 lg:px-12 py-16 lg:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Howl at the Moon?
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of players in the ultimate werewolf adventure. Start your first game today!
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80 text-lg px-12 py-6 rounded-full">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
