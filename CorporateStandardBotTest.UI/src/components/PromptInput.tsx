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
import type { components } from "@/api/schema"
import { Button } from "@/components/ui/button"
import { BrainIcon, CpuIcon, ZapIcon } from "lucide-react"

type AiReasoningEffort = components["schemas"]["AiReasoningEffort"]

type PromptInputProps = {
  name?: string
  value: string
  onValueChange: (value: string) => void
  reasoning: AiReasoningEffort
  setReasoning: (reasoning: AiReasoningEffort) => void
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
          if (e.key == "Enter" && !e.shiftKey) {
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
                <ReasoningLabel reasoning={reasoning} />
              </Button>
            }
          />
          <DropdownMenuContent className="min-w-50">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Select Reasoning Effort</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={reasoning} onValueChange={setReasoning}>
                <DropdownMenuRadioItem closeOnClick value="None">
                  <ReasoningLabel reasoning={"None"} />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem closeOnClick value="Low">
                  <ReasoningLabel reasoning={"Low"} />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem closeOnClick value="Medium">
                  <ReasoningLabel reasoning={"Medium"} />
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

function ReasoningLabel(props: { reasoning: AiReasoningEffort }) {

  if (props.reasoning === "None")
    return <>
      <ZapIcon /> <span className="text-nowrap">Instant Response</span>
    </>

  if (props.reasoning === "Low")
    return <>
      <BrainIcon /> <span className="text-nowrap">Medium Reasoning</span>
    </>

  return <>
    <CpuIcon /> <span className="text-nowrap">High Reasoning</span>
  </>
}
