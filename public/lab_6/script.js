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

      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      
      const countriesA = range(10);

      const countriesA2 = countriesA.map(copyFunction)

      function copyFunction() {
        const country = randomInt(0, 243);
        return fromServer[country];
      }

      const reverse = countriesA2.sort(reverseFunction)

      function reverseFunction(a, b){
        sortFunction(b, a, 'name');
      }

      const ul = document.createElement('ul');
      ul.className = 'flex-inner';
      $('form').prepend(ul);

      reverse.forEach((element, idx) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${element.code} id=${element.code} />`);
        $(li).append(`<label for=${element.code}>${element.name}</label>`);
        $(ul).append(li);
      });
     
    })
    .catch((err) => console.log(err));
});