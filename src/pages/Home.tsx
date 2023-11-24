import { IonContent, IonPage, IonLabel, IonSelect, IonSelectOption, IonTextarea, IonButton } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { TextareaChangeEventDetail } from '@ionic/react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router';

const Home: React.FC = () => {
  const [lenguajeInicial, setLenguajeInicial] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [lenguajeFinal, setLenguajeFinal] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [languages, setLanguages] = useState<Array<{ code: string; name: string }>>([]);
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect  } = useAuth0();
  const { logout  } = useAuth0();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://text-translator2.p.rapidapi.com/getLanguages', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'efc9d2f0f2msh5992d2bc6730b56p14f5d5jsndb7bf2d1f4c7',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
          },
        });

        if (!response.ok) {
          console.error('Error en la solicitud para obtener idiomas:', response.statusText);
          return;
        }

        const data = await response.json();
        const languages = data.data.languages;

        if (languages && languages.length > 0) {
          setLanguages(languages);
          setLenguajeInicial(languages[0].code);
          setLenguajeFinal(languages[0].code);
        } else {
          console.error('La respuesta no contiene idiomas:', data);
        }
      } catch (error) {
        console.error('Error al obtener idiomas:', error);
      }
    };

    fetchData();
  }, []); // Se ejecuta solo en el montaje inicial

  const handleTranslate = async () => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.append('source_language', lenguajeInicial);
      encodedParams.append('target_language', lenguajeFinal);
      encodedParams.append('text', text);

      console.log('Solicitud:', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': 'efc9d2f0f2msh5992d2bc6730b56p14f5d5jsndb7bf2d1f4c7',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        body: encodedParams,
      });

      const response = await fetch('https://text-translator2.p.rapidapi.com/translate', {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': 'efc9d2f0f2msh5992d2bc6730b56p14f5d5jsndb7bf2d1f4c7',
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        body: encodedParams,
      });

      console.log('Respuesta:', response);

      if (!response.ok) {
        console.error('Error en la solicitud de traducción:', response.statusText);
        const errorResponse = await response.json();
        console.error('Detalles del error:', errorResponse);
        return;
      }

      const translatedData = await response.json();

      if (translatedData.data && translatedData.data.translatedText) {
        const translatedText = translatedData.data.translatedText;
        setResult(translatedText);
      } else {
        console.error('La respuesta no tiene el formato esperado:', translatedData);
      }
    } catch (error) {
      console.error('Error al traducir:', error);
    }
  };

  const handleTextChange = (e: CustomEvent<TextareaChangeEventDetail>) => {
    // Verificar si e.detail.value no es null ni undefined antes de asignar al estado
    setText(e.detail.value != null ? String(e.detail.value) : '');
  };

  return (
    <IonPage>
      <nav>
        <div id="brand">
          <img src="https://firebasestorage.googleapis.com/v0/b/fir-app-6e127.appspot.com/o/1660718596584.jfif?alt=media&token=cbb05c08-dada-46f4-acb5-bb8c902d4507" id="logo" alt="Logo"></img>
        </div>
      </nav>
      <IonContent>
        <h1>Traductor de Texto</h1>
        <div className="container">
          <form id="form">
            <IonLabel>
              Traducir :
              <IonSelect value={lenguajeInicial} placeholder="Seleccionar" onIonChange={(e) => setLenguajeInicial(e.detail.value)}>
                {languages.map((language) => (
                  <IonSelectOption key={language.code} value={language.code}>
                    {language.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonLabel>

            <IonTextarea value={text} placeholder="Ingresa el texto a traducir" onIonChange={handleTextChange}></IonTextarea>
          </form>

          <div className="result">
            <IonLabel>
              al:
              <IonSelect value={lenguajeFinal} placeholder="Seleccionar" onIonChange={(e) => setLenguajeFinal(e.detail.value)}>
                {languages.map((language) => (
                  <IonSelectOption key={language.code} value={language.code}>
                    {language.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonLabel>

            <IonTextarea value={result} placeholder="Resultado"></IonTextarea>
          </div>
          {isAuthenticated && (
            <IonButton expand="full" onClick={handleTranslate}>
              Traducir
            </IonButton>
          )}

<button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
<button onClick={() => logout()}>Cerrar sesión</button>
        </div>
      </IonContent>
      
    </IonPage>
  );
};

export default Home;
