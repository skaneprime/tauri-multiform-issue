import './App.css';
import { http, fs, dialog } from '@tauri-apps/api';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={async () => {
          const imagePath = await dialog.open({
            filters: [{ extensions: ['png'], name: "image" }],
            title: "Pic a png"
          });

          if(typeof imagePath !== 'string') return;

          const file = await fs.readBinaryFile(imagePath);
          const mime = "image/png";

          return http.fetch('http://localhost:3001', {
            method: "POST",
            body: http.Body.form({ texture: { file, mime } }) // can't use new Blob cause Body form is not allowing only Uint8Array as a file 
          });
        }}>test</button>
      </header>
    </div>
  );
}

export default App;
