using DeShawnsDogWalking.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

//DATABASE LISTS
List<Dog> dogs = new List<Dog>()
{
    new Dog()
    {
        Id = 1,
        Name = "Tinkle Bell",
        WalkerId = 1,
        CityId = 1,
    },
    new Dog()
    {
        Id = 2,
        Name = "Mr. Peepers",
        WalkerId = 2,
        CityId = 2,
    },
    new Dog()
    {
        Id = 3,
        Name = "Noodle",
        WalkerId = 1,
        CityId = 2,
    },
    new Dog()
    {
        Id = 4,
        Name = "Dr. Corn",
        WalkerId = 3,
        CityId = 2,
    },
    new Dog()
    {
        Id = 5,
        Name = "Waggy",
        WalkerId = 4,
        CityId = 2,
    },
    new Dog()
    {
        Id = 6,
        Name = "Claw Foot",
        WalkerId = 3,
        CityId = 1,
    },
};

//
app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () => {
    return dogs;
});


app.Run();
