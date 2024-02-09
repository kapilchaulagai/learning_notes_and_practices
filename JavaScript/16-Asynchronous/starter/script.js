'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderCountry(data);
//   });
// };

const renderCountry = function (data, className = '') {
  // Convert the object values to an array
  const languages = Object.values(data.languages);
  const currencies = Object.values(data.currencies);
  //console.log(data);

  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)}M people</p>
    <p class="country__row"><span>🗣️</span>${
      // data.name.common === 'Nepal' ? data.languages.nep : data.languages.hin
      languages[0]
    }</p>
    <p class="country__row"><span>💰</span>${currencies[0].name}</p>
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errMsg = 'Something Went Wrong!!') {
  //return whole promise not only the response.json()
  return fetch(url).then(response => {
    //console.log(response);
    if (!response.ok) throw new Error(`${errMsg} ${response.status}`);
    return response.json();
    //err => alert(err)
  });
};
///////////////////////////////////////////////
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found: ${response.status}`);
//       return response.json();
//       //err => alert(err)
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       //console.log(data[0].borders?.[0]);
//       const borderCountryCode = data[0].borders?.[0];
//       return fetch(`https://restcountries.com/v3.1/alpha/${borderCountryCode}`);
//     })
//     .then(
//       response => response.json()
//       //err => alert(err)
//     )
//     .then(data => {
//       console.log(data[0]);
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       //alert(err);
//       renderError(`🔥🔥🔥 Something went wrong!! ${err.message}. Try Again.!`);
//       console.error(`🔥🔥🔥 ${err}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };
////////////////////////////////////////////////////////////

/*const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found:'
  )
    .then(data => {
      renderCountry(data[0]);
      //console.log(data[0].borders?.[0]);
      const borderCountryCode = data[0].borders?.[0];
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${borderCountryCode}`,
        'No neighbour found:'
      );
    })
    .then(data => {
      //console.log(data[0]);
      return renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      //alert(err);
      renderError(`🔥🔥🔥 Something went wrong!! ${err.message}. Try Again.!`);
      console.error(`🔥🔥🔥 ${err}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  // // Prompt the user for input
  // const userInput = window.prompt('Please enter the valid country name:');
  // // Display the user's input
  // if (userInput !== null) {
  //   getCountryData(userInput);
  // } else {
  //   console.log('Not received any input.');
  // }
  whereAmI();
});*/

////////////////////////////////////////////////////////////////
//Challenge #1
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => response.json())
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}.`);
//       return getCountryData(data.country);
//     })
//     .catch(err => {
//       //alert(err);
//       renderError(`❌❌❌Challenge went Wrong!! ${err.message}. Try Again.!`);
//       return console.error(`❌❌❌Challenge error: ${err}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };
// whereAmI(28.3948, 84.125);

////////////////////////////////////////////////////////////////////////////////////////
/*const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => response.json())
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}.`);
      return getCountryData(data.country);
    })
    .catch(err => {
      //alert(err);
      renderError(`❌❌❌Challenge went Wrong!! ${err.message}. Try Again.!`);
      return console.error(`❌❌❌Challenge error: ${err}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

const getPosition = function () {
  // return new Promise(function (resolve, reject) {
  //   navigator.geolocation.getCurrentPosition(
  //     position => resolve(position),
  //     err => reject(err)
  //   );
  // });

  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};*/

////////////////////////////////////////////////////////////////////////
//Coding Challenge #2
/*const imagesContainer = document.querySelector('.images');
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.onload = () => {
      imagesContainer.appendChild(img);
      resolve(img);
    };
    img.onerror = () => reject(new Error('Image Not Found!!'));
  });
};

let currentImg;
createImage('img/img-1.jpg')
  .then(result => {
    currentImg = result;
    return wait(2);
  })
  .then(() => {
    toggleVisibility(currentImg);
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    return wait(2);
  })
  .then(() => toggleVisibility(currentImg))
  .catch(err => console.error(err));

// Toggle function
function toggleVisibility(img) {
  if (img.style.display === 'none') {
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
}*/
//////////////////////////////////////
/*const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    //GeoLocation Position
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error(`There is a problem in reverse geocoding.`);
    const dataGeo = await resGeo.json();
    console.log(dataGeo.country);
    const countryName = `${
      dataGeo.country === 'India' ? 'Bharat' : dataGeo.country
    }`;
    const countryData = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (!countryData.ok)
      throw new Error(`No country found with the name ${dataGeo.country}.`);
    const infoCountry = await countryData.json();
    renderCountry(infoCountry[0]);
    //console.log(infoCountry[0]);
    return `I am at ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`❌❌❌ Something Went Wrong : ${err}`);
    renderError(`❌❌❌ Something Went Wrong : ${err}`);

    //To reject/unfulfill the promise that returns error
    throw err;
  }
};
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`🔥🔥🔥Something went wrong!!: ${err}`));

//Alternate Way using async
(async () => {
  try {
    const result = await whereAmI();
    console.log(result);
  } catch (err) {
    console.error(`🔥🔥🔥Something went wrong!!: ${err}`);
  }
})();*/

////////////////////////////////////////////////////////////////////////////////
/*const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);

    //Alternate Way
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(
      `Could not retrieve the information for all countries: ${err}`
    );
  }
};

get3Countries('nepal', 'bharat', 'usa');

////////////////////////////////////////////////////////////////////////////
//Example Promise.any([])
Promise.any([
  Promise.reject('ERROR'),
  Promise.resolve('Success'),
  Promise.resolve('Another Success'),
]).then(res => console.log(res));*/

///////////////////////////////////////////////////////////////////////////
//Coding Challenge #3
const imagesContainer = document.querySelector('.images');
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;
    img.onload = () => {
      imagesContainer.appendChild(img);
      resolve(img);
    };
    img.onerror = () => reject(new Error('Image Not Found!!'));
  });
};

// let currentImg;
// createImage('img/img-1.jpg')
//   .then(result => {
//     currentImg = result;
//     return wait(2);
//   })
//   .then(() => {
//     toggleVisibility(currentImg);
//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => toggleVisibility(currentImg))
//   .catch(err => console.error(err));

//Toggle function
// function toggleVisibility(img) {
//   if (img.style.display === 'none') {
//     img.style.display = 'block';
//   } else {
//     img.style.display = 'none';
//   }
// }

// let loadNPause = async function () {
//   try {
//     let img = await createImage('img/img-1.jpg');
//     await wait(2);
//     img.style.display = 'none';

//     await wait(2);

//     img = await createImage('img/img-2.jpg');
//     await wait(2);
//     img.style.display = 'none';
//   } catch (err) {
//     console.error(`🔥🔥🔥${err}`);
//   }
// };
// loadNPause();

const loadAll = async function (images) {
  try {
    const allImages = images.map(async img => await createImage(img));
    const allPromises = Promise.all(allImages);
    const res = await allPromises;
    //console.log(res);
    res.forEach(img => img.classList.add('parallel'));
    //res.style.display = 'block';
  } catch (err) {
    console.error(`🔥🔥🔥${err}`);
  }
};
loadAll(['img/img-2.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
