// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {

      const countriesA = range(10);

      const countriesA2 = countriesA.map(function copy()){
        const country = randomInt(0, 243);
        return fromServer[country];
      }
      
      const ten = countries.filter(function(countries){
        if(countries.name.contains('A')){
          return true;
        }
      });
      console.table(ten);
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});