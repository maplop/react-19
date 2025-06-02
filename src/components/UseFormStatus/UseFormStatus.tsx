import { useState } from "react";
import { LanguagesForm } from "./LanguagesForm";
import { submitLanguage } from "../../utils";

export const UseFormStatus = () => {
  const [submittedData, setSubmittedData] = useState<Record<string, FormDataEntryValue> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      <form
        action={async (formData: FormData) => {
          setIsSubmitting(true);
          setError(null);

          const result = await submitLanguage(formData);

          if (result.status === 'success') {
            setSubmittedData(result.data || null);
          } else {
            setError(result.message || 'Error al enviar');
          }
          setIsSubmitting(false);
        }}
      >
        <LanguagesForm />
      </form>

      {isSubmitting && <div>Enviando datos...</div>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {submittedData?.language && <p>Lenguaje enviado: {submittedData.language.toString()}</p>}
    </div>
  );
};
