import { useFormStatus } from "react-dom"

export const LanguagesForm = () => {

  const { data, pending, } = useFormStatus()

  const language = data?.get("language")?.toString();

  return (
    <div>
      <p style={{ textAlign: 'start' }}>Escriba su lenguaje de programación favorito</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <input
          type="text"
          name="language"
          disabled={pending}
          placeholder="Ej. JavaScript"
          required
        />
        <button
          type="submit"
          disabled={pending}
        >
          {pending ? "Enviando..." : 'Enviar'}
        </button>
      </div>
      {language && (
        <p>
          Su lenguaje favorito es: <strong>{language}</strong>
        </p>
      )}
    </div>
  )
}
