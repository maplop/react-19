import { FormEvent, useState, useTransition, use } from "react"
import { updateName } from "../../utils"
import { AuthContext } from "../../context/AuthContext"

export const Form = () => {
  const [name, setName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const { updateUser } = use(AuthContext)
  const [isPending, startTransition] = useTransition()


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const response = await updateName(name);
        if (response instanceof Error) {
          setError(response.message);
          setResult(null);
        } else {
          setError(null);
          setResult(name);
          updateUser(name, true)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setResult(null);
      }
    });
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input
            type="text"
            disabled={isPending}
            placeholder="Ej. Jhon Doe"
            value={name}
            onChange={e => setName(e.target.value)}

          />
          <button
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'Cargando...' : 'Actualizar'}
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <p style={{ color: 'green' }}>Nombre actualizado: {result}</p>}
    </div>
  )
}
