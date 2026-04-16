namespace CorporateStandardBotTest.BusinessLogic.Models;

public record AiChatMessage(AiMessageRole Role, string Content, List<AiChatReference>? References = null);