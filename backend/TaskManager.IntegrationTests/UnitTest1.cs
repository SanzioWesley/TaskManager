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

    [Fact]
    public async Task GetTasks_ComToken_DeveRetornar200()
    {
        var loginRequest = new
        {
            email = "sanziowesley@gmail.com",
            password = "Sanzio12"
        };

        var loginResponse = await _client.PostAsJsonAsync("/api/auth/login", loginRequest);

        loginResponse.StatusCode.Should().Be(HttpStatusCode.OK);

        var json = await loginResponse.Content.ReadAsStringAsync();
        using var document = JsonDocument.Parse(json);

        var token = document.RootElement.GetProperty("token").GetString();

        token.Should().NotBeNullOrEmpty();

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
        //Token falso
        var tokenInvalido = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.123456";

        _client.DefaultRequestHeaders.Authorization = 
            new AuthenticationHeaderValue("Bearer", tokenInvalido);


        var response = await _client.GetAsync("/api/tasks");

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }


}