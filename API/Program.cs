using API.Data.Abstractions;
using API.Data.Context;
using API.Data.Implementations;
using API.Service.Abstractions;
using API.Service.Implementations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=uniBeauty-db;Integrated Security=True;"));

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.UseHsts();
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseCookiePolicy();
app.UseAuthentication();

app.Run();
