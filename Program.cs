using System.ComponentModel.DataAnnotations;
using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;
using Microsoft.VisualBasic;

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
    new Dog()
    {
        Id = 7,
        Name = "Sir Barksalot",
        WalkerId = 1,
        CityId = 3,
    },
    new Dog()
    {
        Id = 8,
        Name = "Stinky",
        WalkerId = null,
        CityId = 3,
    },
    new Dog()
    {
        Id = 7,
        Name = "Moops",
        WalkerId = null,
        CityId = 3,
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
    new Walker()
    {
        Id = 4,
        Name = "Chad Chowder"
    },
    new Walker()
    {
        Id = 5,
        Name = "Terrance Tomlinson"
    },
};

List<City> cities = new List<City>()
{
    new City()
    {
        Id = 1,
        Name = "Nashville"
    },
    new City()
    {
        Id = 2,
        Name = "Knoxville"
    },
    new City()
    {
        Id = 3,
        Name = "Memphis"
    },
};

List<WalkerCity> walkerCities = new List<WalkerCity>()
{
    new WalkerCity() 
    {
        Id = 1,
        WalkerId = 1,
        CityId = 1
    },
    new WalkerCity() 
    {
        Id = 2,
        WalkerId = 1,
        CityId = 2
    },
    new WalkerCity() 
    {
        Id = 3,
        WalkerId = 2,
        CityId = 2
    },
    new WalkerCity() 
    {
        Id = 4,
        WalkerId = 3,
        CityId = 3
    },
    new WalkerCity() 
    {
        Id = 5,
        WalkerId = 2,
        CityId = 1
    },
    new WalkerCity() 
    {
        Id = 6,
        WalkerId = 4,
        CityId = 1
    },
    new WalkerCity() 
    {
        Id = 7,
        WalkerId = 4,
        CityId = 3
    },
    new WalkerCity() 
    {
        Id = 8,
        WalkerId = 5,
        CityId = 2
    },
    new WalkerCity() 
    {
        Id = 9,
        WalkerId = 5,
        CityId = 3
    },
};


//
app.MapPost("/api/cities", (CityDTO city) => {
    int newCityId = cities.Max(city => city.Id) + 1;

    City newCity = new City()
    {
        Name = city.Name
    };
    cities.Add(newCity);
    return Results.Created($"api/cities/{newCityId}", newCity);
});


app.MapGet("/api/walkercities/{id}", (int id) => 
{
    Walker walker = walkers.FirstOrDefault(w => w.Id == id);

    List<WalkerCity> walkerCitiesForWalker1 = walkerCities.Where(wc => wc.WalkerId == id).ToList();

    List<City> walker1Cities = walkerCitiesForWalker1.Select(wc => 

        {
        var city = cities.First(c => c.Id == wc.CityId);
        city.Walker = null;
        return city;
    }).ToList();

    walker.City = walker1Cities;
    return walker;
});

app.MapPut("/api/dogs/{id}", (int id, DogDTO dogDTO) => {
    Dog dog = dogs.FirstOrDefault(dog => dog.Id == id);
    dog.Name = dogDTO.Name;
    dog.WalkerId = dogDTO.WalkerId;
    dog.CityId = dogDTO.CityId;
    return Results.Ok(dog);
});

app.MapGet("/api/citywalkers/{id}", (int id) => 
{
    City city = cities.FirstOrDefault(c => c.Id == id);

    List<WalkerCity> cityWalkersForCity1 = walkerCities.Where(wc => wc.CityId == id).ToList();

    List<Walker> city1Walkers = cityWalkersForCity1.Select(wc => 
    {
        var walker = walkers.First(w => w.Id == wc.WalkerId);
        walker.City = null;
        return walker;
    }).ToList();

    city.Walker = city1Walkers;
    return city;
});

app.MapGet("/api/cities", () => {
    List<CityDTO> CityDTOsList = cities.Select(city => new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    }).ToList();
    return CityDTOsList;
});

app.MapPost("/api/dogs", (Dog newDog) => {
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
    Walker walker = walkers.FirstOrDefault(walker => walker.Id == id);
    return walker is not null ? Results.Ok(walker) : Results.NotFound();
});

app.Run();
