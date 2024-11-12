using System.ComponentModel.DataAnnotations;
using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

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
        WalkerId = 1,
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

List<Walker> walkers = new List<Walker>()
{
    new Walker()
    {
        Id = 1,
        Name = "Tim-Tim"
    },
    new Walker()
    {
        Id = 2,
        Name = "Jimmy James"
    },
    new Walker()
    {
        Id = 3,
        Name = "Walter"
    },
};

//
app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapPost("/api/dogs/", (Dog newDog) => {
    int newId = dogs.Max(dog => dog.Id) + 1;
    newDog.Id = newId;
    dogs.Add(newDog);
    return Results.Created($"/api/dogs/{newDog.Id}", newDog);
});

app.MapGet("/api/dogs", () => {
    return dogs;
});

app.MapGet("/api/dogs/{id}", (int id) => 
{
    Dog dog = dogs.FirstOrDefault(dog => dog.Id == id);
    if (dog == null) {return Results.NotFound();}
    DogDTO dogDTO = new DogDTO
{
    Id = dog.Id,
    Name = dog.Name,
    WalkerId = dog.WalkerId,
    CityId = dog.CityId
};



    Walker walker = walkers.FirstOrDefault(walker => walker.Id == dog.WalkerId);
    WalkerDTO walkerDTO = new WalkerDTO{};
    if (walker == null) {
        walkerDTO = null;
    }
    // if (walker == null) {return Results.NotFound();}



    if (walker != null) 
    {
        dogDTO.WalkerDTO = new WalkerDTO
        {
            Id = (int)dogDTO.WalkerId,
            Name = walker.Name
        };
    } else {
        dogDTO.WalkerDTO = null;
    }
    return dogDTO is not null ? Results.Ok(dogDTO) : Results.NotFound();
});

app.MapGet("/api/walkers", () => {
    return walkers;
});

app.MapGet("/api/walkers/{id}", (int id) => {
    var walker = walkers.FirstOrDefault(dog => dog.Id == id);
    return walker is not null ? Results.Ok(walker) : Results.NotFound();});

app.Run();
