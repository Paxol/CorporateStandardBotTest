import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { SnailIcon, ZapIcon } from "lucide-react"

type PromptInputProps = {
  name?: string
  value: string
  onValueChange: (value: string) => void
  reasoning: "low" | "medium"
  setReasoning: (reasoning: "low" | "medium") => void
  disabled?: boolean
  isSubmitting?: boolean
  maxLength?: number
}

export function PromptInput({
  name = "prompt",
  value,
  onValueChange,
  reasoning,
  setReasoning,
  disabled = false,
  isSubmitting = false,
  maxLength = 280,
}: PromptInputProps) {
  const isDisabled = disabled || isSubmitting
  const charsCount = value.length

  const buttonContent =
    reasoning === "low" ? (
      <>
        <ZapIcon /> Low
      </>
    ) : (
      <>
        <SnailIcon /> Medium
      </>
    )

  return (
    <InputGroup
      data-disabled={isDisabled ? "true" : undefined}
      className="min-h-32 items-stretch rounded-2xl border-border/80 bg-background shadow-sm"
    >
      <InputGroupTextarea
        id="block-end-textarea"
        name={name}
        value={value}
        disabled={isDisabled}
        placeholder="Ask me about corporate standards..."
        maxLength={maxLength}
        rows={4}
        onChange={(e) => onValueChange(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter" && !e.shiftKey)
          {
            e.preventDefault()
            e.currentTarget.form?.requestSubmit()
          }
        }}
        className="min-h-28 px-4 pt-3 text-sm leading-6"
      />
      <InputGroupAddon align="block-end" className="border-t border-border/70">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button className="cursor-pointer" variant="outline" disabled={isDisabled}>
                {buttonContent}
              </Button>
            }
          />
          <DropdownMenuContent className="min-w-40">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Select Reasoning Effort</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={reasoning} onValueChange={setReasoning}>
                <DropdownMenuRadioItem value="low">
                  <ZapIcon /> Low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">
                  <SnailIcon /> Medium
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="ml-auto flex items-center gap-2">
          <InputGroupText>{charsCount}/{maxLength}</InputGroupText>
          <InputGroupButton className="cursor-pointer" type="submit" variant="default" size="sm" disabled={isDisabled}>
            {isSubmitting ? "Sending..." : "Send"}
          </InputGroupButton>
        </div>
      </InputGroupAddon>
    </InputGroup>
  )
}
