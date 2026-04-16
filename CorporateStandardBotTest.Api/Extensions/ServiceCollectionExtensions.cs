using Azure;
using Azure.Identity;
using Azure.Search.Documents.KnowledgeBases;

namespace CorporateStandardBotTest.Api.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddAzureSearchKnowledgeBase(this IServiceCollection services, IConfigurationManager configurationManager)
    {
        services.AddScoped(_ =>
        {
            var endpoint = configurationManager.GetSection("AzureSearch").GetValue<string>("Endpoint");
    
            ArgumentException.ThrowIfNullOrWhiteSpace(endpoint);
    
            var knowledgeBaseName = configurationManager.GetSection("AzureSearch").GetValue<string>("KnowledgeBaseName");
            var key = configurationManager.GetSection("AzureSearch").GetValue<string>("Key");

            if (!string.IsNullOrEmpty(key))
                return new KnowledgeBaseRetrievalClient(
                    endpoint: new Uri(endpoint),
                    knowledgeBaseName: knowledgeBaseName,
                    credential: new AzureKeyCredential(key)
                );

            return new KnowledgeBaseRetrievalClient(
                endpoint: new Uri(endpoint),
                knowledgeBaseName: knowledgeBaseName,
                tokenCredential: new DefaultAzureCredential()
            );
        });
        
        return services;
    }
}