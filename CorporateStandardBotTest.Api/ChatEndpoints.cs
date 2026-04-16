using CorporateStandardBotTest.BusinessLogic.Models;
using CorporateStandardBotTest.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using MinimalHelpers.Routing;

namespace CorporateStandardBotTest.Api;

public class ChatEndpoints : IEndpointRouteHandlerBuilder
{
    public static void MapEndpoints(IEndpointRouteBuilder endpoints)
    {
        var group = endpoints.MapGroup("/api/chat")
            .AllowAnonymous()
            .WithTags("ChatEndpoints");

        group.MapPost("complete", HandleCompleteAsync)
            .Produces<AiChatMessage>()
            .ProducesProblem(500);
    }

    private static async Task<IResult> HandleCompleteAsync(HttpContext context, [FromBody] AiChat chat,
        [FromServices] IKnowledgeBaseService kbService)
    {
        var result = await kbService.GetResponseAsync(chat);

        return result.Match<IResult>(
            success => Results.Ok(success),
            error => Results.Problem(error.Message, statusCode: 500)
        );
    }
}