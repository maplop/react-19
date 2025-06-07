import reactLogo from "./assets/react.svg";
import UseStateActionImg from './assets/useActionState.png'
import PokemonListImg from './assets/PokemonList.png'
import PokemonCardImg from './assets/PokemonCard.png'
import UseTransitionImg from './assets/useTransition.png'
import UseFormStatusImg1 from './assets/UseFormStatus1.png'
import UseFormStatusImg2 from './assets/UseFormStatus2.png'
import OptimisticImg from './assets/Optimistic.png'
import "./App.css";
import { PokemonList } from "./components/Use/PokemonList";
import { use, useCallback, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { Form } from "./components/UseTransition/Form";
import { TabButton } from "./components/TabButton";
import { UseActionState } from "./components/UseActionState/UseActionState";
import { UseFormStatus } from "./components/UseFormStatus/UseFormStatus";
import { UseOptimistic } from "./components/UseOptimistic/UseOptimistic";

export type TabProps =
  'use' | 'useTransition' | 'useActionState' | 'useFormStatus' | 'useOptimistic'



function App() {
  const { name, isLogged, updateUser } = use(AuthContext);
  const [selectedTab, setSelectedTab] = useState<TabProps>('use')

  const renderTabContent = useCallback((selectedTab: TabProps) => {
    switch (selectedTab) {
      case 'use':
        return (
          <div>
            <p><code>use</code> es una API de React que te permite leer el valor de un recurso como una Promesa o un contexto.</p>
            <PokemonList />
            <img src={PokemonCardImg} alt="pokemon-card-img" style={{ marginBottom: 16 }} />
            <img src={PokemonListImg} alt="pokemon-list-img" />
          </div>
        );
      case 'useTransition':
        return (
          <div>
            <p><code>useTransition</code> es un React Hook que te permite renderizar una parte de la UI en segundo plano.</p>
            <Form />
            <img src={UseTransitionImg} alt="use-transition-img" style={{ marginTop: 16 }} />
          </div>
        );
      case 'useActionState':
        return (
          <div>
            <p><code>useActionState</code> es un Hook que le permite actualizar el estado en función del resultado de una acción de formulario.</p>
            <UseActionState />
            <img src={UseStateActionImg} alt="img-useActionState" />
          </div>
        );
      case 'useFormStatus':
        return (
          <div>
            <p><code>useFormStatus</code> es un Hook que le brinda información sobre el estado del último envío del formulario.</p>
            <UseFormStatus />
            <img src={UseFormStatusImg1} alt="img-useActionState1" style={{ marginBottom: 24 }} />
            <img src={UseFormStatusImg2} alt="img-useActionState2" />
          </div>
        );
      case 'useOptimistic':
        return (
          <div>
            <p><code>useOptimistic</code> es un React Hook que te permite actualizar la interfaz de usuario de forma optimista.</p>
            <UseOptimistic />
            <img src={OptimisticImg} alt="img-optimistic" style={{ marginTop: 24 }} />
          </div>
        );
      default:
        return (
          <div>
            <h2>Selecciona una pestaña</h2>
            <p>Elige una de las nuevas funcionalidades de React para explorar</p>
          </div>
        );
    }
  }, []);

  return (
    <div>
      <img
        src={reactLogo}
        className="logo react"
        alt="React logo"
        style={{ marginBottom: "16px" }}
      />
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <h1>
          Probando las nuevas funcionalidades de{" "}
          <span style={{ color: "yellow" }}>React 19</span>
        </h1>
      </div>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        {isLogged ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <h3 style={{ margin: 0 }}>Hola {name}</h3>
            <button onClick={() => updateUser(null, false)}>
              Cerrar Sesion
            </button>
          </div>
        ) : (
          <button onClick={() => updateUser("Jhon Doe", true)}>
            Iniciar Sesion
          </button>
        )}
      </div>
      {isLogged && (
        <div style={{ width: 900 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <TabButton isSelected={selectedTab === 'use'} onClick={() => setSelectedTab('use')} label="use" />
            <TabButton isSelected={selectedTab === 'useTransition'} onClick={() => setSelectedTab('useTransition')} label="useTransition" />
            <TabButton isSelected={selectedTab === 'useActionState'} onClick={() => setSelectedTab('useActionState')} label="useActionState" />
            <TabButton isSelected={selectedTab === 'useFormStatus'} onClick={() => setSelectedTab('useFormStatus')} label="useFormStatus" />
            <TabButton isSelected={selectedTab === 'useOptimistic'} onClick={() => setSelectedTab('useOptimistic')} label="useOptimistic" />
          </div>
          <hr style={{ border: "1px solid #0172AD" }} />
          <article>
            {renderTabContent(selectedTab)}
          </article>
        </div>
      )}
    </div>
  );
}

export default App;
