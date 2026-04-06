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
}