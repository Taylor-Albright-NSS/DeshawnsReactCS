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

export const getWalker = async (id) => {
  const res = await fetch(`/api/walkers/${id}`)
  return res.json()
}