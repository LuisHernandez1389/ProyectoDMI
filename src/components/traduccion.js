let boton = document.querySelector('#submit');
let texto = document.querySelector('#text').value;
let result = document.querySelector('#result')
let lenguajeInicial = document.querySelector('#lenguajeInicial');
let lenguajeFinal = document.querySelector('#lenguajeFinal');

let x = 'es'; let e;

const options = {
	method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'efc9d2f0f2msh5992d2bc6730b56p14f5d5jsndb7bf2d1f4c7',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
      }
};

fetch('https://text-translator2.p.rapidapi.com/getLanguages', options)
	.then(response => response.json())
	.then(response => {
        let languages = response.data.languages;
        languages.forEach(element => {
            lenguajeInicial.innerHTML += `<option value="${element.code}">${element.name}</option>`
            lenguajeFinal.innerHTML += `<option value="${element.code}">${element.name}</option>`  
        });

        lenguajeInicial.addEventListener('click', ()=>{
            x = lenguajeInicial.value
        });

        lenguajeFinal.addEventListener('click', ()=>{
            console.log(lenguajeFinal.value)
            e = lenguajeFinal.value;
        });
    })
	.catch(err => console.error(err));


    boton.addEventListener('click', event=>{
    event.preventDefault();
    texto = document.querySelector('#text').value;
    console.log(texto);
    
    const encodedParams = new URLSearchParams();
    //source y target solicitados
    encodedParams.append("source_language", x); encodedParams.append("target_language", e); encodedParams.append("text", texto);
    console.log(encodedParams);

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'efc9d2f0f2msh5992d2bc6730b56p14f5d5jsndb7bf2d1f4c7',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
          },
        body: encodedParams
    };

    fetch('https://text-translator2.p.rapidapi.com/translate', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            let Text = response.data.translatedText;
            result.innerText = Text;
        })
        .catch(err => console.error(err));
});