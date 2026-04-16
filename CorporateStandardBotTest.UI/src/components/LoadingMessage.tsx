import { useEffect, useState } from "react"

const pendingMessageStyle = `.pending-message-scroll{animation:pending-message-scroll-in 220ms ease-out}@keyframes pending-message-scroll-in{from{opacity:0;transform:translateY(.35rem)}to{opacity:1;transform:translateY(0)}}`

const PENDING_MESSAGES = [
  "Thinking...",
  "Reviewing your request...",
  "Searching for relevant information...",
  "Drafting the response...",
  "Almost there...",
  "Just a moment...",
  "Compiling the answer...",
]

export function LoadingMessage() {
  const [pendingMessageIndex, setPendingMessageIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPendingMessageIndex((currentIndex) => (currentIndex + 1) % PENDING_MESSAGES.length)
    }, 6000)

    return () => window.clearInterval(intervalId)
  }, [])

  const pendingMessage = PENDING_MESSAGES[pendingMessageIndex]

  return (
    <>
      <style>{pendingMessageStyle}</style>
      <div className="flex justify-start">
        <div className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm text-muted-foreground shadow-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-muted-foreground/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-muted-foreground" />
            </span>
            <span key={pendingMessage} className="pending-message-scroll inline-block">
              {pendingMessage}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}