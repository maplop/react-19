import { useState, useActionState } from 'react';
import { updateJob } from '../../utils';


export const UseActionState = () => {

  const updateJobAction = async (previousState: any, formData: FormData) => {
    const job = formData.get('job') as string;

    try {
      const res = await updateJob(job);
      return {
        job: res.job,
        message: res.message,
        error: res.error
      };
    } catch (error) {
      return {
        job: null,
        message: 'Error al actualizar el trabajo',
        error: true
      };
    }
  };

  const [state, submitAction, isPending] = useActionState(updateJobAction, {
    job: null,
    message: '',
    error: false
  });

  return (
    <div style={{ marginBottom: '16px' }}>
      <h4>Mi trabajo actual es: {state?.job}</h4>
      <form action={submitAction}>
        <label style={{ textAlign: 'initial' }}>Ingrese su trabajo actual</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <input
            placeholder='Ej. developer'
            type="text"
            id="jobInput"
            name='job'
          />
          <button type='submit' disabled={isPending}>
            {isPending ? 'Actualizando...' : 'Enviar'}
          </button>
        </div>
      </form>
      {state?.error && <p style={{ color: 'red' }}>{state.message}</p>}
      {!state?.error && state?.job && <p style={{ color: 'green' }}>{state.message}</p>}
    </div >
  );
};