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

//DATABASE LISTS
List<DogDTO> dogsDTO = new List<DogDTO>()
{
    new DogDTO()
    {
        Id = 1,
        Name = "Tinkle Bell",
        WalkerId = 1,
        CityId = 1,
    },
    new DogDTO()
    {
        Id = 2,
        Name = "Mr. Peepers",
        WalkerId = 2,
        CityId = 2,
    },
    new DogDTO()
    {
        Id = 3,
        Name = "Noodle",
        WalkerId = 1,
        CityId = 2,
    },
    new DogDTO()
    {
        Id = 4,
        Name = "Dr. Corn",
        WalkerId = 3,
        CityId = 2,
    },
    new DogDTO()
    {
        Id = 5,
        Name = "Waggy",
        WalkerId = 1,
        CityId = 2,
    },
    new DogDTO()
    {
        Id = 6,
        Name = "Claw Foot",
        WalkerId = 3,
        CityId = 1,
    },
};

List<WalkerDTO> walkersDTO = new List<WalkerDTO>()
{
    new WalkerDTO()
    {
        Id = 1,
        Name = "Tim-Tim"
    },
    new WalkerDTO()
    {
        Id = 2,
        Name = "Jimmy James"
    },
    new WalkerDTO()
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

app.MapGet("/api/dogs", () => {
    return dogsDTO;
});

app.MapGet("/api/dogs/{id}", (int id) => 
{
    DogDTO dog = dogsDTO.FirstOrDefault(dog => dog.Id == id);
    if (dog == null) {return Results.NotFound();}

    WalkerDTO walker = walkersDTO.FirstOrDefault(walker => walker.Id == dog.WalkerId);
    if (walker != null) 
    {
        dog.WalkerDTO = new WalkerDTO
        {
            Id = dog.WalkerId,
            Name = walker.Name
        };
    } else {
        dog.WalkerDTO = null;
    }
    return dog is not null ? Results.Ok(dog) : Results.NotFound();
});

app.MapGet("/api/walkers", () => {
    return walkersDTO;
});

app.MapGet("/api/walkers/{id}", (int id) => {
    var walker = walkersDTO.FirstOrDefault(dog => dog.Id == id);
    return walker is not null ? Results.Ok(walker) : Results.NotFound();});

app.Run();
