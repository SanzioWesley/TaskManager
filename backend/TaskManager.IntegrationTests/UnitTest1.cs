using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;

namespace TaskManager.IntegrationTests;

public class TasksTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public TasksTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    private async Task<string> GetTokenAsync()
    {
        var loginRequest = new
        {
            email = "sanziowesley@gmail.com",
            password = "Sanzio12"
        };

        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", loginRequest);

        var json = await loginResponse.Content.ReadAsStringAsync();
        using var document = JsonDocument.Parse(json);
        var token = document.RootElement.GetProperty("token").GetString();

        return token;// --ADICIONE ESTA LINHA
    }

    [Fact]
    public async Task GetTasks_ComToken_DeveRetornar200()
    {
        var token = await GetTokenAsync();

        _client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);

        var response = await _client.GetAsync("/api/tasks");

        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetTasks_SemToken_DeveRetornar401()
    {

        // Não adiciona token no header
        var getResponse = await _client.GetAsync("/api/tasks");

        // Deve retornar não autorizado
        getResponse.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task GetTasks_ComTokenInvalido_DeveRetornar401()
    {
        var token = await GetTokenAsync(); // 1 linha (reaproveitou as 10)
                                          // depois modifica o token para inválido
    }


}