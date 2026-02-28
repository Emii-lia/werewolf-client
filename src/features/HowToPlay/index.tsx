import HTSection from "@/features/HowToPlay/components/HTSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "./HowToPlay.scss"

const HowToPlay = () => {
  return (
    <div className="HowToPlay">
      <HTSection className="HowToPlay__header" >
        <h2 className="ht-header-title">
          How to Play
        </h2>
        <p className="ht-header-description">
          Master the rules of Werewolf and become a strategic mastermind. Learn the fundamentals and dominate the game.
        </p>
      </HTSection>
      <HTSection className="HowToPlay__content">
        <h3 className="ht-content-title">
          Game Overview
        </h3>
        <Card className="ht-overview-card">
          <p className="hto-text">
            Werewolf is a game of deception, strategy, and social deduction. Players are divided into two teams: the <span className="font-semibold text-foreground">Villagers</span> who must work together to identify and eliminate the hidden <span className="font-semibold text-foreground">Werewolves</span> before they destroy the village. Meanwhile, the Werewolves use deception and secrecy to stay hidden while eliminating villagers one by one.
          </p>
          <p className="hto-text">
            The game alternates between day and night phases, with unique mechanics for each phase that create thrilling moments of suspicion, alliance-building, and dramatic reveals.
          </p>
        </Card>
      </HTSection>
      <HTSection className="HowToPlay__content">
        <h3 className="ht-content-title">
          The Two Clans
        </h3>
        <div className="ht-clans">
          <Card className="ht-clan-card">
            <h4 className="ht-clan-title">
              Villagers
            </h4>
            <div className="ht-clan-content">
              <p>
                Villagers are the innocent townspeople trying to protect their village. They work during the day to identify and vote out the Werewolves through discussion and deduction.
              </p>
              <div className="ht-clan-win">
                <p className="ht-win-label">Win Condition: </p>
                <p className="">Identify and eliminate all Werewolves before the village is destroyed.</p>
              </div>
            </div>
          </Card>
          <Card className="ht-clan-card">
            <h4 className="ht-clan-title">
              Werewolves
            </h4>
            <div className="ht-clan-content">
              <p>
                Werewolves are hidden monsters that know each other's identities. They eliminate villagers at night and use deception during the day to avoid being discovered.
              </p>
              <div className="ht-clan-win">
                <p className="ht-win-label">Win Condition: </p>
                <p className="">Reduce the number of villagers until Werewolves equal or outnumber them.</p>
              </div>
            </div>
          </Card>
        </div>
      </HTSection>
      <HTSection className="HowToPlay__content">
        <h3 className="ht-content-title">Game Phases</h3>
        <div className="ht-phases">
          <Card className="ht-phase-card">
            <h4 className="ht-phase-title">Day Phase</h4>
            <div className="ht-phase-content">
              <p>
                <span className="font-semibold text-foreground">Discussion:</span> All remaining players discuss and debate who they suspect is a Werewolf. Use logic, observation, and social deduction.
              </p>
              <p>
                <span className="font-semibold text-foreground">Voting:</span> Players vote to eliminate someone from the game. The player with the most votes is eliminated.
              </p>
              <p>
                <span className="font-semibold text-foreground">Reveal:</span> The eliminated player's identity is revealed. If a Werewolf is eliminated, Villagers gain momentum. If a Villager is eliminated, the Werewolves celebrate their deception.
              </p>
            </div>
          </Card>
          <Card className="ht-phase-card">
            <h4 className="ht-phase-title">Night Phase</h4>
            <div className="ht-phase-content">
              <p>
                <span className="font-semibold text-foreground">Werewolf Action:</span> Werewolves wake up and secretly communicate with each other. They choose a Villager to eliminate.
              </p>
              <p>
                <span className="font-semibold text-foreground">Villager Sleep:</span> All other players are asleep and unaware of what's happening.
              </p>
              <p>
                <span className="font-semibold text-foreground">Elimination:</span> The chosen Villager is eliminated, and their body is discovered at dawn.
              </p>
            </div>
          </Card>
        </div>
      </HTSection>
      <HTSection className="HowToPlay__content">
        <h3 className="ht-content-title">Winning the Game</h3>
        <div className="ht-win-conditions">
          <Card className="ht-win-card">
            <h4 className="ht-win-title">Villagers Win When: </h4>
            <ul className="ht-win-list">
              <li className="ht-win-item">
                <span className="text-primary font-bold">✓</span>
                <span>All Werewolves have been eliminated during day phases.</span>
              </li>
              <li className="ht-win-item">
                <span className="text-primary font-bold">✓</span>
                <span>The game ends with more Villagers than Werewolves remaining.</span>
              </li>
            </ul>
          </Card>
          <Card className="ht-win-card">
            <h4 className="ht-win-title">Werewolves Win When: </h4>
            <ul className="ht-win-list">
              <li className="ht-win-item">
                <span className="text-primary font-bold">✓</span>
                <span>Werewolves equal or outnumber the remaining Villagers.</span>
              </li>
              <li className="ht-win-item">
                <span className="text-primary font-bold">✓</span>
                <span>All Villagers have been eliminated.</span>
              </li>
            </ul>
          </Card>
        </div>
      </HTSection>
      <HTSection className="HowToPlay__content">
        <h4 className="ht-content-title">Strategic Tips</h4>
        <div className="ht-tips-list">
          {[
            {
              title: 'Pay Attention to Behavior',
              description: 'Watch how players react to accusations and revelations. Nervous behavior or defensive responses can reveal hidden identities.',
            },
            {
              title: 'Manage Information',
              description: 'As a Villager, share clues carefully. As a Werewolf, manage what you reveal to avoid suspicion.',
            },
            {
              title: 'Stay Engaged',
              description: 'Even if you\'re eliminated, watch the game continue. Future games depend on knowledge from past mistakes.',
            },
            {
              title: 'Don\'t Rush Decisions',
              description: 'Take time during discussions to analyze claims and behaviors. Hasty votes often help the Werewolves.',
            },
            {
              title: 'Adapt Your Strategy',
              description: 'Every game is different. Learn from each round and adjust your approach based on the players and game state.',
            },
            {
              title: 'Have Fun!',
              description: 'Remember, Werewolf is a game of fun and social interaction. Enjoy the experience, whether you win or lose!',
            }
          ].map((tip, index) => (
            <Card key={index} className="ht-tip-card">
              <h4 className="ht-tip-title">{tip.title}</h4>
              <p className="ht-tip-description">{tip.description}</p>
            </Card>
          ))}
        </div>
      </HTSection>
      <HTSection className="HowToPlay__footer">
        <h3 className="ht-footer-title">
          Ready to Play?
        </h3>
        <p className="ht-footer-description">
          Now that you understand the rules, it's time to test your skills. Host or join a game and start playing!
        </p>
        <div className="ht-footer-buttons">
          <Button
            size="lg"
            asChild
          >
            <Link href="/login">
              Start Playing
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
          >
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </HTSection>
    </div>
  )
}

export default HowToPlay;