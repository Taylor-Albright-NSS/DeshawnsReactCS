export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs")
  return res.json();
}
export const getDog = async (id) => {
  const res = await fetch(`/api/dogs/${id}`)
  return res.json();
}

export const getWalkers = async () => {
  const res = await fetch(`/api/walkers/`)
  return res.json()
}
export const getWalker = async (id) => {
  const res = await fetch(`/api/walkers/${id}`)
  return res.json()
}

export const getCities = async () => {
  const res = await fetch(`/api/cities/`)
  return res.json()
}
export const getCity = async (id) => {
  const res = await fetch(`/api/cities/${id}`)
  return res.json()
}
//Walkers with cities embedded
export const getWalkerCityBridgeTable = async () => {
  const res = await fetch("/api/walkercities")
  return res.json()
}
export const getWalkerCities = async (id) => {
  const res = await fetch(`/api/walkercities/${id}`)
  return res.json()
}

//Cities with walkers embedded
export const getCityWalkers = async (id) => {
  const res = await fetch(`/api/citywalkers/${id}`)
  return res.json()
}


